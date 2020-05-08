## Koa-ts
## author: hcg1023
### 一个基于koa+ts+nodemon+pm2的nodejs项目
### 本地使用nodemon运行，prd与test使用pm2运行
### 考虑到同一套代码编译不同环境，所以在运行start:prd与start:test指令的时候，会生成不同的文件夹，dist-prd与dist-test文件夹，确保不同环境之间的独立。
### 关于环境变量
#### 可以在ecosystem.config.js中设置test与prd的env环境变量，在nodemon.json中设置本地运行的环境变量
#### 大部分配置目前还在config.ts下，除port端口外并无明显区分环境
1. 本地运行
    ```
    npm run start
    ```
2. 打包运行
    ```
    npm run start:prd // prd环境
    npm run start:test // test环境
    ```
3. test与prd环境终止运行
    ```
    npm run stop:prd // prd环境
    npm run stop:test // test环境
    ```
