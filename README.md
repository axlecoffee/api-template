# axle.coffee API Template V1

hi team I made this quickly so I can spin up shitty API's faster than before. This was originally built for Mod Checker - one of my projects - but I figured I'd make it a template so I can make use of it in open/closed source projects in the future without having to re-invent the wheel :D

## Requirements

- Node.js v22.x.x or higher
- a brain
- hopes and dreams
- a cup of coffee
- pnpm
- MongoDB v4.x.x or higher

## Getting Started

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/axlecoffee/api-template.git
    cd api-template
    ```

2. Install dependencies:

    ```sh
    pnpm install
    ```

3. Create the `config.json` file in root:

    ```json
    {
    	"databaseUri": "mongodb://user:password@url"
    }
    ```

### Running the Application

#### Development

To start the application in development mode with hot-reloading:

```sh
pnpm run dev
```

### Testing

To run tests:

```sh
pnpm run test
```

### Formatting

To format the code:

```sh
pnpm run format
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](./LICENSE) file for details.
