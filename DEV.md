# 开发文档

## 目录结构

```bash
├── __test__ # 测试文件
├── build # 构建工具配置文件
├── example # dev环境下的example
├── rollup.config.js # rollup打包主入口文件
├── rollup.example.config.js # example运行配置文件
└── src
    ├── components
    │ ├── Editor.vue
    │ └── Toolbar.vue
    ├── utils
    └── index.ts
```

## dev 本地开发

`yarn dev` 启动本地服务，使用 src/App.vue 文件

`yarn test` 单元测试，使用 test 目录

## build 构建

`yarn build` 构建代码，使用 src 目录。

## release 发布

`yarn release` 可触发 github actions 并发布 npm
