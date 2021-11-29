# wangEditor for Vue

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/@wangeditor/editor-for-vue.svg)](https://www.npmjs.com/package/@wangeditor/editor-for-vue/v/next) [![build status](https://github.com/vuejs/vue-next/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/wangeditor-team/wangEditor-for-vue/actions)

[中文文档](./README.md)

## Introduction

Use `ctrl+enter` or `cmd+enter` to insertBreak in [wangEditor](https://www.wangeditor.com/v5/en/).

## Installation

```sh
yarn add @wangeditor/plugin-ctrl-enter
```

## Usage

You should register plugin before create editor, and register only once (not repeatedly).

```js
import { Boot } from '@wangeditor/editor';
import withCtrlEnter from '@wangeditor/plugin-ctrl-enter';

Boot.registerPlugin(withCtrlEnter);

// Then create editor and toolbar
```
