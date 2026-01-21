"""from crawl4ai import AsyncWebCrawler
import asyncio

ans \= \[\]

async def main():
 async with AsyncWebCrawler() as crawler:
 result \= await crawler.arun(url\="https://www.od\-wiki.com/Report/RP\-8\.html", bypass\_cache\=False)
 \# For full site crawl, use crawler.crawl\_urls() with a list of discovered links
 print(result.markdown) \# Save to .md files manually or script it
 ans.append(result)
asyncio.run(main())

for container in ans:
 for result in container:
 with open("output.md", "w", encoding\="utf\-8") as f:
 f.write(result.markdown)

print(ans)

print(ans)
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
"""
import requests
from bs4 import BeautifulSoup \# 用于解析HTML，提取链接
from urllib.parse import urljoin, urlparse \# urljoin用于处理相对路径，urlparse用于解析URL
import os \# 用于创建本地文件夹和文件操作
import queue \# 使用队列实现BFS爬取，避免递归深度问题
import time \# 用于添加延时
import random \# 用于随机延时，避免被检测为爬虫

"""

\# 配置部分：定义基本参数
base\_url \= "https://www.od\-wiki.com" \# 网站基地址，所有相对路径以此为基础拼接
proxies \= {
 'http': 'http://localhost:9910', \# HTTP代理配置（如果SOCKS5可用，可换成socks5://）
 'https': 'http://localhost:9910'
}
headers \= {
 "User\-Agent": "Mozilla/5\.0 (Windows NT 10\.0; Win64; x64; rv:147\.0\) Gecko/20100101 Firefox/147\.0" \# 伪装浏览器User\-Agent
}

vis \= set() \# 已访问的路径集合（使用标准化路径存储，避免重复爬取）
q \= queue.Queue() \# 队列用于BFS爬取：先进先出，适合广度优先遍历网站

\# 起始点：既然爬取整个网站，从根路径开始
q.put("/") \# 将根路径入队作为起点

def normalize\_path(path):
 parsed \= urlparse(path)
 norm\_path \= parsed.path.rstrip('/').lower()
 if parsed.query:
 norm\_path \+\= '?' \+ parsed.query
 return norm\_path

def save\_html(path, content):
 filename \= path.lstrip('/').replace('/', os.sep) \# 转换为本地文件路径
 if not filename.endswith('.html'):
 if filename.endswith('/'):
 filename \= filename.rstrip('/') \# 去除尾部/
 filename \+\= '/index.html' \# 目录式路径保存为index.html

 dir\_path \= os.path.dirname(filename) \# 获取目录部分
 if dir\_path: \# 只在dir\_path非空时创建文件夹，避免空路径错误
 os.makedirs(dir\_path, exist\_ok\=True) \# 创建文件夹，如果不存在
 with open(filename, "w", encoding\="utf\-8") as f:
 f.write(content)
 print(f"已保存本地文件: {filename}") \# 保存成功提示

\# 主循环：BFS爬取整个网站
while not q.empty():
 current\_path \= q.get() \# 从队列取出下一个路径
 norm\_path \= normalize\_path(current\_path) \# 标准化当前路径
 if norm\_path in vis:
 continue
 vis.add(norm\_path) \# 标记为已访问

 full\_url \= urljoin(base\_url, current\_path) \# 拼接完整URL
 print(f"开始爬取: {full\_url}") \# 爬取开始提示

 try:
 response \= requests.get(full\_url, headers\=headers, proxies\=proxies, timeout\=10\) \# 发送GET请求，超时10秒
 response.raise\_for\_status() \# 如果状态码非200\-299，抛出异常
 response.encoding \= response.apparent\_encoding \# 自动检测编码

 \# 保存HTML到本地
 save\_html(current\_path, response.text)
 print(f"爬取成功: {full\_url}") \# 爬取成功提示

 \# 解析HTML，提取所有链接
 soup \= BeautifulSoup(response.text, 'html.parser') \# 使用BeautifulSoup解析
 for link in soup.find\_all('a', href\=True): \# 查找所有标签的href
 href \= link\['href'\]
 if href.startswith('\#') or href.startswith('javascript:') or href.startswith('mailto:'):
 continue \# 跳过锚点、JS链接、邮件链接

 \# 处理相对路径：转换为绝对URL
 abs\_url \= urljoin(full\_url, href)
 parsed\_url \= urlparse(abs\_url)

 \# 过滤条件：只爬取同一域名下的HTML页面（避免外部链接、图片、JS等）
 if parsed\_url.netloc !\= urlparse(base\_url).netloc:
 continue \# 跳过不同域名

 \# 过滤条件：如果这个文件所在的目录存在"Report"，则跳过

 if "/Report/" in parsed\_url.path:
 continue

 new\_path \= parsed\_url.path \# 获取路径部分
 new\_norm \= normalize\_path(new\_path) \# 标准化新路径
 if new\_norm not in vis:
 q.put(new\_path) \# 入队新路径
 print(f"入队新路径: {new\_path}") \# 入队提示

 except Exception as e:
 print(f"爬取失败 {full\_url}: {e}") \# 错误提示

 \# 随机延时：模拟人类行为，避免被封禁（2\-8秒随机）
 time.sleep(random.uniform(0\.5, 1\))

print("爬取完成：队列已空，所有可达页面已处理")
"""

from html\_to\_markdown import convert\_to\_markdown
import re
from pathlib import Path

def remove\_script\_tags(html: str) \-\> str:
 pattern \= r''
 cleaned \= re.sub(pattern, '', html, flags\=re.DOTALL \| re.IGNORECASE)
 return cleaned

def process\_file(path):

 with open(path, "r", encoding\="utf\-8") as f:
 html \= f.read()

 html \= remove\_script\_tags(html)
 md \= convert\_to\_markdown(html)

 \# 对于md字符串，markdown格式，存在任何内链的，且以.html格式结尾的，一律改成.md

 pattern \= "\\\\((\[^)\]\+)\\\\.html\\\\)"
 md \= re.sub(pattern, r"(\\1\.md)", md)

 \# 若含有meta\-og:description: 某某某 字段，则在上一步加的 \# 后，文档的任何文字开始前加入一个markdown上标文字： 某某某

 pattern \= r'meta\-og:description:(.\+)'
 match \= re.search(pattern, md)
 if match:
 description \= match.group(1\).strip()
 \# 在标题后插入描述\\

 yaml\_end \= md.find('\-\-\-', 3\) \# 找到第二个\-\-\-的位置
 if yaml\_end !\= \-1:
 md \= md\[:yaml\_end \+ 3\] \+ f"^\*{description}\*^" \+ md\[yaml\_end \+ 3:\]

 \# 若含有meta\-og:title:某某某 字段，则在YAML标注后，文档的任何文字开始前加入一个markdown标题： \# 某某某

 pattern \= r'meta\-og:title:(.\+)'
 match \= re.search(pattern, md)
 if match:
 title \= match.group(1\).strip()
 \# 在YAML标注后插入标题
 yaml\_end \= md.find('\-\-\-', 3\) \# 找到第二个\-\-\-的位置
 if yaml\_end !\= \-1:
 md \= md\[:yaml\_end \+ 3\] \+ f"\\n\# {title}" \+ md\[yaml\_end \+ 3:\]





 \# 保存路径为同一路径下的md
 path \= path.with\_suffix('.md')
 \# print(path)
 with open(path, "w", encoding\="utf\-8") as f:
 f.write(md)

\# 对于本文件的文件夹以及它的所有下属文件夹中所有的文件都进行这个操作：



target\_folder \= Path(r"./")
for file in target\_folder.rglob("\*.\*"):
 if not file.is\_file():
 continue
 if file.suffix \=\= ".md":
 continue
 process\_file(file)

"""from pathlib import Path
import shutil

target\_folder \= Path(r"./")
trash\_folder \= target\_folder / "已删除的404页"
trash\_folder.mkdir(exist\_ok\=True)

count \= 0
for file in target\_folder.rglob("\*.\*"):
 if not file.is\_file():
 continue
 try:
 text \= file.read\_text(encoding\='utf\-8', errors\='ignore').lower()
 if '此页不存在。' in text:
 dest \= trash\_folder / file.name
 file.rename(dest)
 count \+\= 1
 print(f"移走 → {dest}")
 except Exception as e:
 print(f"处理失败 {file}: {e}")

print(f"共移走 {count} 个疑似404文件")

import re
from pathlib import Path

path \= r"./报告/overspeedwiki/RP{}.md" \# 生成一个三位数，前导零怎么写？？
\# 我需要你帮我 模仿上一个

def fix(content: str) \-\> str:
 \# 找到 YAML front matter 的结束位置
 match \= re.match(r"(\-\-\-\\s\*\[\\s\\S\]\*?\-\-\-\\s\*)", content, re.DOTALL)
 if not match:
 \# 没有 front matter，直接处理全文
 body \= content
 header \= ""
 else:
 header \= match.group(1\)
 body \= content\[len(header):\]

 \# 在所有单个换行符处添加  
，但保留两个及以上换行符为段落分隔
 \# 先将所有 \\r\\n 替换为 \\n，统一换行符
 body \= body.replace('\\r\\n', '\\n')
 \# 用正则将不是连续两个及以上换行符的单换行替换为  
\\n
 body \= re.sub(r'(?\<!\\n)\\n(?!\\n)', '  
\\n', body)

 return header \+ body


for i in range(1, 221\):
 p \= path.format(str(i).zfill(3\))
 try:
 with open(p, "r", encoding\="utf\-8") as f:
 content \= f.read()

 ans \= fix(content)

 with open(p, "w", encoding\="utf\-8") as f:
 f.write(ans)
 print(f"已处理: {p}")
 except FileNotFoundError:
 print(f"文件未找到: {p}")
"""
