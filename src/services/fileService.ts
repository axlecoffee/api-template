import fs from 'fs';
import path from 'path';
import FileModel from '../models/fileModel';
import crypto from 'crypto';

const FILE_STORAGE_PATH = path.join(__dirname, '../../uploads');

class FileService {
    constructor() {
        this.ensureUploadDirectory();
    }

    /**
     * Ensures that the upload directory exists.
     */
    ensureUploadDirectory() {
        if (!fs.existsSync(FILE_STORAGE_PATH)) {
            fs.mkdirSync(FILE_STORAGE_PATH, { recursive: true });
        }
    }

    /**
     * Saves a file to the file system and stores its metadata in the database.
     * @param {Object} file - The file object containing buffer and originalname.
     * @param {Buffer} file.buffer - The buffer of the file.
     * @param {string} file.originalname - The original name of the file.
     * @param {string} uplName - The upload name associated with the file.
     * @returns {Promise<Object>} - An object containing the filename and hash.
     */
    async saveFile(file: { buffer: Buffer; originalname: string }, uplName: string): Promise<{ filename: string; hash: string }> {
        const fileHash = this.hashFile(file);
        const filePath = path.join(FILE_STORAGE_PATH, file.originalname);

        if (fs.existsSync(filePath)) {
            // file already exists so we dont need to save or send to db 
            return { filename: file.originalname, hash: fileHash };
        }
        
        await fs.promises.writeFile(filePath, file.buffer);
        await this.storeFileInDatabase(file.originalname, fileHash, uplName);

        return { filename: file.originalname, hash: fileHash };
    }

    /**
     * Generates a SHA-256 hash for the given file.
     * @param {Object} file - The file object containing buffer.
     * @param {Buffer} file.buffer - The buffer of the file.
     * @returns {string} - The SHA-256 hash of the file.
     */
    hashFile(file: { buffer: Buffer }): string {
        const hash = crypto.createHash('sha256');
        hash.update(file.buffer);
        return hash.digest('hex');
    }

    /**
     * Stores the file metadata in the database.
     * @param {string} filename - The name of the file.
     * @param {string} fileHash - The SHA-256 hash of the file.
     * @param {string} uplName - The upload name associated with the file.
     * @returns {Promise<void>}
     */
    async storeFileInDatabase(filename: string, fileHash: string, uplName: string): Promise<void> {
        const fileEntry = new FileModel({ filename, fileHash, uplName });
        try {
            await fileEntry.save();
        } catch (error) {
            if ((error as any).code !== 11000) {
                throw error;
            }
        }
    }

    /**
     * Deletes a file from the file system and removes its metadata from the database.
     * @param {string} fileHash - The SHA-256 hash of the file to be deleted.
     * @returns {Promise<boolean>} - True if the file was deleted, false otherwise.
     */
    async deleteFile(fileHash: string): Promise<boolean> {
        const fileEntry = await FileModel.findOne({ fileHash });
        if (!fileEntry) {
            return false;
        }

        const filePath = path.join(FILE_STORAGE_PATH, fileEntry.filename);
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }

        const result = await FileModel.deleteOne({ fileHash });
        return result.deletedCount > 0;
    }
}

export default new FileService() as FileService;