FROM node:18-slim

WORKDIR /app

# 複製前端構建文件
COPY client/build ./public

# 複製後端文件
COPY api/package*.json ./
RUN npm install --production

COPY api/*.js ./

# 設置環境變量
ENV PORT=8080
ENV NODE_ENV=production
ENV HTTP2_ENABLED=false

# 暴露端口
EXPOSE 8080

# 啟動命令
CMD ["node", "server.js"]