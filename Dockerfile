FROM node:22-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# claudeslop
RUN echo -e "allowBuilds:\n  esbuild: true" > pnpm-workspace.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts=false

COPY . .

USER node
CMD ["pnpm", "exec", "ts-node", "src/app.ts"]
