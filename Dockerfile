FROM node:18.2-bullseye-slim
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 4200
CMD ["npm", "run", "startlocaldocker"]