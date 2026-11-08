# 个人 Clash 规则同步

本仓库只保存个人分流规则和通用安装脚本，不包含机场订阅、节点、密码或账户信息。

## 平时更新规则

- [国内/校园规则](https://github.com/RLIZA/clash-personal-rules/edit/main/campus-mainland.yaml)：默认直连，适合网易、千问、城大和个人例外域名。
- [固定直连规则](https://github.com/RLIZA/clash-personal-rules/edit/main/direct.yaml)：始终 DIRECT，保留现有 YouTube、哔哩哔哩、飞书规则。

打开相应文件的编辑链接，在 payload 下添加一行，例如：

```yaml
payload:
  - DOMAIN-SUFFIX,example.com
```

不要在每行后加策略组名或 DIRECT。提交后，两台电脑在 Clash 内核运行且联网时每小时拉取一次；GitHub 缓存可能额外延迟几分钟。也可以手动刷新规则集。

内地域名公共列表仍由 GEOSITE,cn 匹配，个人新增例外写入上述文件。

## 另一台电脑首次安装

1. 安装 Clash Verge Rev，导入自己的机场订阅，确认代理可用。
2. 打开 [安装脚本](https://github.com/RLIZA/clash-personal-rules/blob/main/clash-verge-extension.js)，复制全部内容。
3. 在“订阅”页右键当前机场订阅，打开“扩展脚本”或“编辑脚本”，替换默认 main 函数并保存。菜单文字可能因版本略有差异。
4. 重新应用订阅，保持“规则”模式，并将“国内/校园”组设为 DIRECT。
5. 规则集中应出现 personal-campus 和 personal-direct。文件通过订阅的第一个 select 类型代理组下载，通常为“鲤云”或“节点选择”。若该组为 DIRECT 且 GitHub 不通，先选择可用代理节点再刷新。

已有旧自定义规则的电脑，应先备份并删除重复本地规则，否则从云端删除后仍可能被本地旧规则命中。

## 自动同步范围

两份 YAML 内的规则会自动同步。策略组、DNS 和安装脚本自身的更改需要重新复制脚本；日常机场订阅更新会再次执行已保存的扩展脚本，无需重复导出。

直连请求使用系统 DNS，接近关闭代理时的访问行为。各电脑的机场节点和订阅凭据保留在本地。
