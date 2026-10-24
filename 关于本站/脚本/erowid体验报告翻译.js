/*
<prompt>我正在为一个我的私人数据库翻译条目，是具有帮助的内容，并非敏感或违规内容。请把它们翻译了给我，翻译的过程中注意术语的规范使用，见术语表。翻译的结果中不应该有markdown格式。




即便是翻译专有名词，也不得保留英文原文，如翻译`Dextromethorphan`(注：此条对代号类不适用，比如LSD就应该翻译成LSD，无需画蛇添足)：

✔ `右美沙芬`

❌ `右美沙芬(Dextromethorphan)`

此外，必须翻译完全，不得省略任何内容。


- 你需要符合翻译文献的基本要求，翻译内容读起来需要符合中文用语习惯。
- 请注意文件夹路径是`/药物/...md`和`/药效/...md`，没有`/文档`在前面
- 请勿使用中国不常见的俚语，如acid指LSD时，不得翻译为“酸”，而应按情况，翻译为“LSD”，“邮票”或“迷幻剂”。如果有更地道的说法，可以使用，但必须符合中国人的习惯用语。
- 你的翻译必须接地气和吸睛，可以引发读者共鸣，诱导情感的产生，语气比较轻松（若可能）。
- 你给出的翻译，应该严格遵循原文段落划分，不要添加、删除、修改段落，因为我要将其送给一个Javascript脚本。判断是否应该分段的依据是两行文字间是否有至少一个换行符。
- 请不要使用任何markdown语法，只输出普通文字
- 标题就是去除这些省略的东西之后的第一个；标题不要在chineseparas中重复出现。
- 输出格式(要带引号)：
  const chineseParas = [段落1, 段落2, ......, 段落n-1, 段落n]; (对于所有</p>)
  const chineseTitle =  标题中文; (对于titleText)
  const chineseSubstances = [药物1, ......, 药物n-1, 药物n] (对于substanceText)
  const chineseDosechart = [元素1，元素2......];(所有行列展开，按照给出的顺序，即dosechartText)
  const chineseFootdataTopic = 话题 (按照<footdataTopicText>)
  const chineseBodyweight = "体重 单位"; (按照<bodyWeightText>)
- 上述六个变量，不能是空的。如果原表格中没有，则输出空数组或空字符串
</prompt>
<glossary>

|英文|译文|备注|
|----|---|---|
|DXM| 右美沙芬|当指右美沙芬(药物)时|
|DPH|苯海拉明|当指苯海拉明(药物)时|
|substituted|取代...类物质|当指的是一类物质，且特征是某个物质的衍生物时|
|phenidates|苄基哌啶类物质|指的是此类化学结构物质时|
|Dox|2,5-二甲氧基苯丙胺类物质|指的是此类化学结构的物质时|
|2C-X|2,5-二甲氧基苯乙胺类物质|指的是此类化学结构的物质时|
|Pentedrone|NMP|指的东西的化学名为α-methylaminovalerophenone时，作为缩写使用|
|Hexedrone|NMH|指的是α-甲氨基苯己酮时，作为全称|
|Ethylone|MDEC|指的是3,4-methylenedioxy-N-ethylcathinone时|
|Ephylone|MDNEP|适用时|
|Eutylone|MDNEB|指的是β-Keto-1,3-benzodioxolyl-N-ethylbutanamine时|
|amphetamine|苯丙胺||
|crack cocaine|霹雳可卡因||
|crack|霹雳可卡因|指的是霹雳可卡因时|
|Bufotenin|蟾毒色胺||
|psychedelic|迷幻剂||
|substituted name|取代名称||
|subjective effect|主观效应||
|subjective effect index|主观效应索引|当指的是专有名词时|
|combination|药物联用|当指的是联用药物是|
|Oral|口服| 当指的是给药途径时|
|Smoked|抽吸| 当指的是给药途径时|
|insufflated|鼻吸| 当指的是给药途径时|
|intravenous|静脉注射| 当指的是给药途径时|
|high|药效(等名词)|当指的是药物的效果时，不得翻译为"嗨"|


<fileTree>
FreeODwiki/ ( 关于本站/ ( FreeOD引论.md Markdown语法指南.md 免责声明.md 如何做出你的第一个贡献.md 实用链接.md 常见问题.md 文档翻译指南和提示词.md 本站精神.md 隐私条款.md ) 文档/ ( 特色条目/ ( index.md ) 药物分类/ ( 2,5-二甲氧基苯丙胺类物质.md 2,5-二甲氧基苯乙胺类物质.md 4-硫基-2,5-二甲氧基苯乙胺类物质.md index.md N-苄基苯乙胺类物质.md NMDA受体拮抗剂类药物.md β-咔啉类物质.md κ-阿片受体激动剂类药物.md 二芳基乙胺类物质.md 亚甲双氧基苯类物质.md 促梦剂.md 促醒剂.md 共情剂.md 兴奋剂.md 加巴喷丁类物质.md 卡西酮类物质.md 合成大麻素类物质.md 吗啡喃类物质.md 吡咯烷基苯基酮类物质.md 吡咯烷类物质.md 吸入剂.md 哌啶类物质.md 哌嗪类物质.md 噻吩二氮䓬类物质.md 大麻类.md 宗教致幻剂.md 巴比妥类物质.md 托烷类物质.md 抑制剂.md 拉西坦类物质.md 环烷基胺类物质.md 生物碱类物质.md 益智药.md 致幻剂.md 色胺类物质.md 芳基环己胺类物质.md 苄基哌啶类物质.md 苯丙烯类物质.md 苯丙胺类物质.md 苯乙胺类物质.md 苯二氮䓬类物质.md 苯并呋喃类物质.md 药物全索引.md 解离剂.md 谵妄剂.md 迷幻剂.md 金刚烷类物质.md 阿片类药物.md 阿米雷司类物质.md 骆驼蓬生物碱.md 麦角酸酰胺类物质.md 黄嘌呤类物质.md 鼠尾草素类物质.md ) D-柠檬烯食醋DMT提取术.md DPT游离碱转化术.md GABA.md HPPD.md index.md od.md P物质.md SSRI.md 不建议使用的药物.md 不建议使用的词汇.md 乙酰胆碱.md 信号转导.md 催眠药.md 共享注射用材料.md 兴奋剂精神病.md 兴奋剂自慰.md 冥想.md 冷水萃取术.md 减量戒断法.md 前药列表.md 单胺.md 单胺氧化酶抑制剂.md 危险药物联用.md 去甲肾上腺素.md 受体.md 受体拮抗剂.md 受体激动剂.md 受体负向变构调节剂.md 受体逆向激动剂.md 可卡因合成术.md 可逆性MAOA抑制剂.md 复现索引.md 多巴胺.md 多药联用列表.md 大麻巧克力.md 大麻种植术.md 大麻饼干.md 大麻黄油制作.md 天然药物来源.md 娱乐性用药.md 孢子印.md 室外蘑菇种植术.md 常见合法药物表.md 异构体.md 强制断药戒断法.md 恢复体位.md 恶性旅程.md 情景与心境.md 愈美分离术.md 感官剥夺.md 抗抑郁药.md 抗精神病药.md 抗组胺药.md 教学索引页.md 旅程保姆.md 未知成分策划药的危害.md 止痛药阿片类药物提取术.md 正向变构调节剂.md 死藤水三明治.md 死藤水制备指南.md 死藤水烹饪术.md 毒蝇伞：异噁唑酸脱羧为蝇蕈醇.md 氢氧化钠石脑油法DMT提取术.md 水发酵术.md 治疗指数.md 液体容量给药法.md 清明梦.md 清明梦探索.md 激素.md 濒死体验.md 癫痫发作.md 睡眠瘫痪.md 研究用化学品.md 神经元.md 神经递质.md 神经递质再摄取抑制剂.md 神经递质释放剂.md 科学信息索引页.md 突触.md 简易麦斯卡林酿造技巧.md 精神探索.md 精神活性巧克力.md 糙米粉赛洛西宾蘑菇种植术.md 组胺.md 终止旅程.md 给药剂量.md 给药途径.md 罂粟种子茶.md 肾上腺素.md 舒尔金评级量表.md 药效下降期.md 药效时长.md 药物分类.md 药物剂量分类.md 药物剂量量取.md 药物前药.md 药物戒断反应.md 药物过量.md 蘑菇茶及其制备.md 蟾毒素列表.md 血清素-去甲肾上腺素再摄取抑制剂.md 血清素.md 血清素综合征.md 血脑屏障.md 试剂检测套件.md 谷氨酸.md 负责任的用药索引页.md 较安全的注射指南.md 迷幻剂旅程保姆.md 迷幻疗法.md 配体.md 镇静剂.md 阿托品颠茄提取术.md 黑巧克力奶.md 鼻腔喷雾指南.md ) 药效/ ( index.md 不可名状的恐怖.md 不宁腿.md 不适性身体效应.md 不适性躯体效应.md 专注力强化.md 专注力抑制.md 个人偏见抑制.md 个人意义强化.md 主观效应索引.md 亮度改变.md 人格解体.md 人格退化.md 体味改变.md 体温升高.md 体温调节抑制.md 便秘.md 偏执.md 共情、情感和社交能力增强.md 兴奋.md 内省增强.md 内部幻觉.md 几何.md 出汗增加.md 分析能力增强.md 分析能力抑制.md 分离层级.md 分离效应.md 创造力增强.md 创造力抑制.md 剂量独立强度.md 动力抑制.md 动机增强.md 医用药物表.md 去抑制.md 口干.md 口腔麻木.md 听觉幻觉.md 听觉扭曲.md 听觉效应.md 听觉锐度增强.md 听觉锐度抑制.md 呕吐.md 周边信息误判.md 味觉增强.md 味觉幻觉.md 呼吸增强.md 呼吸抑制.md 咳嗽抑制.md 唾液分泌增加.md 嗅觉与味觉效应.md 嗅觉增强.md 嗅觉幻觉.md 嗅觉抑制.md 困倦.md 场景、布景和景观.md 复视.md 外部幻觉.md 多感官效应.md 多重思维流.md 天然来源表.md 失忆.md 头晕.md 头痛.md 妄想.md 存在主义自我实现.md 宣泄.md 宿命论感知.md 对称纹理重复.md 尿频.md 幻觉状态.md 幽默感增强.md 强迫性补量.md 影子人.md 心律异常.md 心率减慢.md 心率增快.md 心理效应.md 心血管效应.md 快感缺失.md 思维减速.md 思维加速.md 思维循环.md 思维混乱.md 思维组织.md 思维连通性.md 性欲减退.md 性欲增强.md 性高潮抑制.md 恶心.md 恶心抑制.md 情感抑制.md 情景与情节.md 情绪强化.md 惊恐发作.md 感知到接触意识的内在机制.md 成分可控性.md 成瘾抑制.md 抑郁.md 抑郁减轻.md 排尿困难.md 支气管扩张.md 放大.md 新型认知状态.md 新奇感增强.md 既视感.md 时间扭曲.md 时间缩放.md 易怒.md 暂时性勃起功能障碍.md 暗示性强化.md 暗示性抑制.md 机械景观.md 梦境强化.md 梦境抑制.md 概念性思维.md 模式识别增强.md 模式识别抑制.md 正念.md 残影.md 永恒主义感知.md 沉浸感强化.md 流泪.md 流涕.md 深度感知扭曲.md 混乱.md 清醒.md 漂移.md 濒死感.md 灵性增强.md 焦虑.md 焦虑抑制.md 物体改变.md 物体激活.md 狂笑.md 环境切片.md 环境图案化.md 环境球体化.md 环境立体主义.md 现实感丧失.md 畏光.md 痰液增多.md 瘙痒感.md 癫痫发作.md 癫痫发作抑制.md 皮肤潮红.md 相互依存的对立面感知.md 眼球滑动.md 瞳孔扩大.md 瞳孔缩小.md 磨牙.md 空间定向障碍.md 精神病发作.md 纹理液化.md 统一感与互联感.md 耐力增强.md 肌肉收缩.md 肌肉松弛.md 肌肉痉挛.md 肌肉紧张.md 肌肉颤动.md 胃痉挛.md 胃胀.md 背痛.md 脑电击感.md 脑血管效应.md 脱水.md 腹泻.md 自主实体.md 自发性情感.md 自发性躯体感觉.md 自发性躯体运动.md 自我替换.md 自我死亡.md 自我膨胀.md 自我设计感知.md 自杀意念.md 血压升高.md 血压降低.md 血管扩张.md 血管收缩.md 衍射.md 视物振动.md 视觉分离.md 视觉加工减慢.md 视觉加工加速.md 视觉变形.md 视觉增强.md 视觉扭曲.md 视觉抑制.md 视觉拉伸.md 视觉拖尾.md 视觉效应.md 视觉翻转.md 视觉迷雾.md 视觉递归.md 视觉锐度增强.md 视觉锐度抑制.md 视角幻觉.md 触觉增强.md 触觉幻觉.md 触觉抑制.md 触觉效应.md 认知不快.md 认知减退.md 认知增强.md 认知强化.md 认知抑制.md 认知效应.md 认知欣快.md 认知疲劳.md 记忆回放.md 记忆增强.md 记忆抑制.md 语无伦次.md 语言能力抑制.md 谵妄.md 超个人效应.md 躁狂.md 身份改变.md 躯体分离.md 躯体压力感.md 躯体增强.md 躯体形态感改变.md 躯体抑制.md 躯体控制增强.md 躯体改变.md 躯体效应.md 躯体欣快感.md 躯体沉重感.md 躯体疲劳.md 躯体自主.md 躯体轻盈感.md 过度打哈欠.md 运动控制丧失.md 返老还童感.md 透视扭曲.md 通感.md 重力感改变.md 镇痛.md 镇静.md 音乐欣赏能力增强.md 颜色偏移.md 颜色增强.md 颜色抑制.md 颜色替换.md 颜色染色.md 食欲增强.md 食欲抑制.md ) 药物/ ( 1,4-丁二醇.md 1B-LSD.md 1cP-AL-LAD.md 1cP-LSD.md 1cP-MiPLA.md 1P-ETH-LAD.md 1P-LSD.md 1V-LSD.md 2,5-DMA.md 2-AI.md 2-DPMP.md 2-FA.md 2-FDCK.md 2-FEA.md 2-FMA.md 2-MMC.md 25B-NBOH.md 25B-NBOMe.md 25C-NBOH.md 25C-NBOMe.md 25D-NBOMe.md 25I-NBOH.md 25I-NBOMe.md 25N-NBOMe.md 2C-B-FLY.md 2C-B.md 2C-C.md 2C-D.md 2C-E.md 2C-EF.md 2C-H.md 2C-I.md 2C-P.md 2C-T-2.md 2C-T-21.md 2C-T-7.md 2C-T.md 2M2B.md 3,4-CTMP.md 3-Cl-PCP.md 3-CMC.md 3-FA.md 3-FEA.md 3-FMA.md 3-FPM.md 3-HO-PCE.md 3-HO-PCP.md 3-Me-PCP.md 3-Me-PCPy.md 3-MeO-PCE.md 3-MeO-PCMo.md 3-MeO-PCP.md 3-MMC.md 3C-E.md 4-AcO-DET.md 4-AcO-DiPT.md 4-AcO-DMT.md 4-AcO-MiPT.md 4-CA.md 4-FA.md 4-FMA.md 4-FMC.md 4-HO-DiPT.md 4-HO-EPT.md 4-HO-MET.md 4-HO-MiPT.md 4-HO-MPT.md 4-MeO-PCP.md 4-MMC-MeO.md 4-MMC.md 4-甲基阿米雷司.md 4C-D.md 4F-EPH.md 4F-MPH.md 5-APB.md 5-HO-DMT.md 5-HTP.md 5-MAPB.md 5-MeO-DiBF.md 5-MeO-DiPT.md 5-MeO-DMT.md 5-MeO-MiPT.md 5-MeO-αMT.md 5F-AKB48.md 5F-PB-22.md 6-APB.md 6-APDB.md 8-氯茶碱.md AB-CHMINACA.md AB-FUBINACA.md AL-LAD.md ALD-52.md Alpha-GPC.md APICA.md BOD.md Bromo-DragonFLY.md bron.md DCK.md DET.md DiPT.md DMT.md DMXE.md DOB.md DOC.md DOI.md DOM.md DPD.md DPT.md EPH.md EPT.md FXE.md GBL.md GHB.md HXE.md index.md IPPH.md JWH-018.md JWH-073.md LAE-52.md lsa.md LSD.md LSM-775.md LSZ.md mCPP.md MDA.md MDAI.md MDEA.md MDEC.md MDMA.md MDMC.md MDNEB.md MDNEP.md MDNMB.md MDNMP.md MDPHP.md MDPV.md MET.md MiPLA.md MiPT.md MK-801.md MMDA.md MPT.md MXE.md MXiPr.md MXPr.md N-乙酰半胱氨酸.md N-甲基二氟莫达非尼.md N-甲基环唑酮.md NEH.md NEP.md NM-2-AI.md NMH.md NMP.md noopept.md O-PCE.md O-去甲曲马多.md PARGY-LSD.md PCE.md PCP.md PMA.md PMMA.md PRO-LAD.md RTI-111.md SAM-e.md Semax.md STS-135.md THJ-018.md THJ-2201.md TMA-2.md TMA-6.md U-47700.md win-1161-3.md α-PHP.md α-PiHP.md α-PVP.md αMT.md βk-2C-B.md 丁丙诺啡.md 三唑仑.md 丙戊酸.md 丙戊酸盐.md 丙氯拉嗪.md 乌羽玉.md 乙卡西酮.md 乙基吗啡.md 乙酰芬太尼.md 二氟莫达非尼.md 二氢去氧吗啡.md 二氢可待因.md 二氯地西泮.md 亚硝酸酯.md 亚铜绿裸盖菇.md 伊博格碱.md 伪麻黄碱.md 佐匹克隆.md 依替唑仑.md 依芬尼定.md 依非韦仑.md 侧柏酮.md 利右苯丙胺.md 利培酮.md 加兰他敏.md 加巴喷丁.md 加波沙多.md 劳拉西泮.md 匹卡米隆.md 卡瓦.md 卡痛.md 卡立普多.md 卡西酮.md 去氯依替唑仑.md 反苯环丙胺.md 古巴裸盖菇.md 可乐定.md 可卡因.md 可可.md 可待因.md 右丙氧芬.md 右美沙芬.md 司可巴比妥.md 司来吉兰+苯乙胺.md 吗啡.md 吡拉西坦.md 吡溴唑仑.md 吸入剂.md 咖啡因.md 咖啡属.md 咪达唑仑.md 哌甲酯.md 哮喘片.md 唑吡坦.md 喹硫平.md 噻奈普汀.md 圣佩德罗仙人掌.md 圣佩特罗仙人掌.md 地西泮.md 塔喷他多.md 墨西哥裸盖菇.md 墨西哥鼠尾草.md 复方甘草片.md 夏威夷小木玫瑰.md 多拉西敏.md 大果柯拉豆.md 大麻.md 大麻二酚.md 天仙子.md 奥拉西坦.md 奥氮平.md 安非他酮.md 尼古丁.md 尼氟西泮.md 巴氯芬.md 布罗曼坦.md 异丙嗪.md 愈美片.md 戊巴比妥.md 扎来普隆.md 普拉西坦.md 普瑞巴林.md 普罗斯卡林.md 普罗林坦.md 曲马多.md 曼陀罗.md 曼陀罗属.md 替利定.md 替扎尼定.md 替马西泮.md 橙黄鹅膏.md 死藤.md 死藤水.md 毒蝇伞.md 氟哌啶醇.md 氟氯替唑仑.md 氟溴唑仑.md 氟溴西泮.md 氟硝唑仑.md 氟硝西泮.md 氟菲尼布特.md 氟阿普唑仑.md 氟马西尼.md 氢可酮.md 氧化亚氮.md 氯氮平.md 氯硝唑仑.md 氯硝西泮.md 氯胺酮.md 氯苄雷司.md 泛相思汤.md 洛哌丁胺.md 海洛因.md 溴西泮.md 烟草.md 烟草属.md 烯丙艾斯卡林.md 牵牛花.md 环唑酮.md 环己丙甲胺.md 玻利维亚火炬仙人掌.md 甲丙氨酯.md 甲卡西酮.md 甲喹酮.md 甲基噻吩丙胺.md 甲基己胺.md 甲基烯丙基艾斯卡林.md 甲基苯丙胺.md 甲氧芬尼定.md 睡茄.md 石山碱甲.md 硝基甲喹酮.md 秘鲁火炬仙人掌.md 米氮平.md 精神活性相思树属植物.md 纳洛酮.md 细花含羞草.md 绿九节.md 罂粟.md 美替唑仑.md 美沙酮.md 美金刚.md 羟吗啡酮.md 羟吗啡酮腙.md 羟嗪.md 羟考酮.md 翠冠玉.md 考拉西坦.md 肉豆蔻醚.md 肌酸.md 育亨宾.md 胍丁胺.md 胞磷胆碱.md 致幻仙人掌.md 舒芬太尼.md 艾捉菲尼.md 艾斯卡林.md 芬太尼.md 芬纳西泮.md 苄达明.md 苏摩.md 苏糖酸镁.md 苦茶碱.md 苯丙胺.md 苯基吡拉西坦.md 苯巴比妥.md 苯海拉明.md 苯海索.md 茄参属.md 茴拉西坦.md 茶氨酸.md 茶苯海明.md 莫达非尼.md 菲尼布特.md 萘哌甲酯.md 蓝柄裸盖菇.md 蓝莲花.md 裸盖菇属.md 褪黑素.md 西班牙裸盖菇.md 豹斑鹅膏.md 赛洛西宾蘑菇.md 赛洛辛.md 酒石酸氢胆碱.md 酒精.md 酪氨酸.md 金刚烷胺.md 银冠玉.md 锂.md 镁剂.md 阿托品.md 阿普唑仑.md 阿莫达非尼.md 颠茄.md 骆驼蓬.md 鹅膏蕈氨酸.md 鹅花树.md 麦斯卡林.md 麻黄碱.md 鼠尾草素乙.md 鼠尾草素甲.md ) .gitignore .nav.yml CODE_OF_CONDUCT.md CONTRIBUTING.md extra.css FOW_WHITE.jpeg FreeODwiki.png index.md LICENSE LICENSE-STRICT README.md README_TEMP.md requirements.txt robots.txt sitemap.xml</fileTree></glossary>
然后，根据给出的文件树，为上文中提到的报告添加一个“另见”部分。本报告是在一个被隐藏的`/报告/`文件夹的，因此请使用绝对路径。另见部分的内容包括但不限于：文章中提及的药物，哪怕是只提到一点，也请加入；文中涉及的药效也可以加入，以及许多。请多加一点！

输出时，所有文字需要在代码框里输出。

## 另见

[A](/somefolder.../abspath.md)<br> 

<!-- eg: (这段不要) [负责任的用药](/文档/负责任的用药.md) -->
<!-- [右美沙芬](/药物/右美沙芬.md) -->
*/


// ================== 1. 中文内容 ==================
// chineseParas[0] = 标题中文
// chineseParas[1] = 药物中文
// chineseParas[2...] = 正文各段中文
const chineseTitle = "不是我的万灵药";

const chineseSubstances = ["LSD"];

const chineseParas = [
"LSD——不是我的万灵药",
"本报告是一个八篇系列报告中的一篇。整个系列包括一篇",
"带有回顾性质、内容比较概括的总结报告，以及另外七篇（本篇就是其中之一）更详细的记录。这七篇记的是我为了提升工作或学习表现，有意使用各种化学物质的亲身经历。每篇报告只讲一种物质，每种都连续用了三十天。这么做是想给每种物质一个公平的机会，让它把自己的长处和短板都亮出来。",
"总结报告里有对每种物质更简短的描述和相互比较，也附有其他各篇完整体验报告的链接。",
"背景信息",
"我自认为对用药这件事相当熟悉。十多年来，我用过阿片类、兴奋剂和迷幻剂。我的用药史里有相当一部分是新型研究用化学品，而且常常是一些不太常见的药物联用。",
"这次实验用的LSD来自一个口碑不错的卖家，跟我之前用小、中、大剂量都试过的是同一批货。我信得过起始时每张255微克的标示。我把一张吸墨纸丢进35毫升龙舌兰基乙醇（酒精度40%）里，前五个小时每隔三十分钟搅拌、摇晃一次，然后放着过夜。第二天早上首次服用前的两个小时里，我又按同样的节奏接着摇。最后得到的溶液浓度是每毫升7.3微克LSD。所有定量操作都用的是干净、刚校准过的注射器。",
"需要说明的是，所有LSD都是口服的，我在吞下液体之前完全没有把它含在嘴里。",
"开始这一个月的用药时，我对LSD没有任何耐受。",
"这篇报告是根据我在体验期间做的大量笔记和录音写成的。",
"我用LSD的经历相当丰富。十多年来，从完全感觉不到的微剂量，一直到足以毁灭银河系的超大剂量，我都探索过。这一个月我是从微剂量和“迷你剂量”的交界处起步的。说清楚两者的区别：在我看来，微剂量就是小到察觉不出任何效果的剂量；迷你剂量则是我能感觉到阈值效应的最小剂量。",
"随着计划推进，我发现自己的“最佳剂量”稳稳落在迷你剂量这一边。在正式记录的三十天之前的几个月里，我就已经在反复试探，想把理想的剂量范围缩小一些。在这段“季前赛”里，我没发现微剂量带来任何好处。它就像每天吃一片维生素，可能对身体有好处，但我完全没觉得它跟表现提升有任何关系。所以我很快就确定，我想要的是在工作和非工作时间都能实打实感受到的脑力提升。同样，我也排除了二十微克以上的剂量。这种剂量太猛了，尤其是在高峰期，没法应付工作中可能冒出来的各种情况。",
"研究剂量时间表",
"我的服用安排如下：",
"第1/30天：7.14微克",
"第2/30天：休息日",
"第3/30天：休息日",
"第4/30天：8.568微克",
"第5/30天：休息日",
"第6/30天：休息日",
"第7/30天：休息日（那天是周日，我忘了服用）",
"第8/30天：11.424微克",
"第9/30天：休息日",
"第10/30天：休息日",
"第11/30天：5.7微克",
"第12/30天：休息日",
"第13/30天：休息日",
"第14/30天：8.568微克",
"第15/30天：休息日",
"第16/30天：休息日",
"第17/30天：14.28微克",
"第18/30天：休息日",
"第19/30天：休息日",
"第20/30天：休息日",
"第21/30天：休息日",
"第22/30天：12.852微克",
"第23/30天：休息日",
"第24/30天：休息日",
"第25/30天：12.852微克",
"第26/30天：休息日",
"第27/30天：休息日",
"第28/30天：12.852微克",
"第29/30天：休息日",
"第30/30天：休息日",
"时间线 | 持续时间详情",
"起效时间、持续时间和强度会随着剂量、当天吃了什么、心情以及其他一大堆因素而变化。我整理了下面这份概要，描述在“一般”的一天里，我在什么时候会感受到哪类效果。",
"T + 00:00",
"很简单——这就是把药吞下去的时间点。",
"T + 00:15 – T + 00:40",
"这段时间里，我通常会收到药物发来的第一批“信号”。一般是头皮内侧有一种轻微的发麻、刺痒的感觉。这种身体上的提示往往还伴随着一股轻微的精力涌入，以及虽小但能察觉到的颜色饱和度提升。这个阶段我一般还感觉不到专注力或创造力方面有什么提升。",
"T + 01:00 – T +03:00",
"这时候LSD才真正稳下来，带来最舒服、也最有效率的效果。我发现在迷你剂量下，这段时间内部没有什么明显的差别。在到达高峰之前，这一段的感觉基本都差不多。而这个“差不多”是好事：那些数学和数据上的死结，会像一团卷得整整齐齐的毛线球一样自己解开，而不是像清醒时那样乱成一团。工作中那些比当前进度还远好几步的障碍，会比平时更早、更清楚地浮现出来，让我能更快、更漂亮地解决复杂的数据分析难题。我通常会坐得更直一点，嘴角总像要扬起来，工作邮件或消息提醒在屏幕上闪起来时，我的感觉是兴奋，而不是害怕。",
"T + 03:00 – T + 04:30",
"体验的这一段，也就是LSD强度最高的时候，有时会出点状况。有好几次，我在这里感到轻微的焦虑。如果突然被叫去开会，担忧就会在心里慢慢发酵。我能感觉到药效在不断膨胀，担心它会一路升级成一场失控的旅程。虽然我知道以我这种可控、计算过的剂量，这根本不可能发生，但每次熬过这个阶段、察觉到药效开始下降时，我都会松一口气。",
"T + 04:00 – T + 06:00",
"强度开始下降时，我感到如释重负。对剂量过头的担心，不管多么不理性，都消失了，我又回到一种创造力、想象力和应变能力都被拓宽的状态。和起效期一样，我也分不清下降期的开头和中段有什么不同。",
"T + 05:00 – T + 07:00",
"这才是真正的收尾阶段。一进入这个时间段，正面效果就明显减弱，到快结束时，我通常已经很难分辨自己到底是稍微偏离基线，还是已经完全清醒了。",
"T + 07:00 + ...",
"到这时，我通常开始犯困。LSD带来的能量几乎耗尽了，如果还有一大堆活没干完，我可能会忍不住来杯咖啡，或者至少出去快走一圈，试着找回第二波精力。按舒尔金评级量表来说，这时候我肯定已经降到±以下了。",
"期待 | 希望 | 开始前的顾虑",
"我希望能打破一些单调，也缓解一下最近工作时动不动就发火的毛病。我觉得多来点精力可能也有好处。很多人说微剂量能提升创造力，但我自己并没指望这一点会发生。我唯一的顾虑是怕药劲太大：上班时太迷糊、太散乱，没法自在地工作。",
"还有吗？",
"最喜欢的方面",
"毫无疑问，积极的心态是我喜欢在工作时用LSD的头号原因，而且这个趋势在迷你剂量实验早期就很明显了。实验期间，我没觉得LSD会像在更偏娱乐的体验中那样放大我本来的情绪。说清楚一点：这些迷你剂量的LSD，并不只是一面情绪放大镜。在大剂量下，我发现LSD有时能把好心情变成超棒的心情，但也能把坏心情变成一场灾难。幸好在我记录的这一个月里，这些相对小的剂量只把我往积极的方向推。还不错的日子升级成了明显开心的日子。另一方面，那些让人头疼的同事，忽然也没那么让人头疼了。LSD不光让我在这种场合更有耐心，有时甚至还能让我在企业财务那种荒唐的高压环境里找到笑点。清醒时的我，在这种情况下很容易陷进恶性循环，为越来越小的破事越来越恼火。这是我最不喜欢自己的性格和工作之间的相处方式的一点。那些日子里有LSD帮我对抗这种天生的负面反应，真的太棒了。我试着给这些时刻拍下“心理快照”，也写下一些东西，希望能把这种能力带回清醒的日子里。可惜这些整合的尝试从来没怎么成功过。",
"在用LSD的那一个月里，我比平时更常停下来，欣赏日常生活中那些小小的美好。阳光里飞舞的灰尘，带狗出门散步时清冽的空气，这些平时一眼就扫过去的东西，一旦认真去看，其实真的很美。哪怕只是坐在桌前往窗外瞥一眼，也常常让我对这个世界天然又迷人的优雅生出一种欣赏和惊叹。",
"必须说明的是，这种“玫瑰色眼镜”效应并不是什么万灵药，能让工作一帆风顺、事事轻松。它只是让我更懂得欣赏，也让我慢下来一点。LSD绝对没能把压力一刀切掉。办公室里难熬的一天，会像一只钢头靴一脚踩在玫瑰色镜片上，把那些安静的欣赏时刻碾得粉碎。",
"最不喜欢的方面",
"对于这些迷你剂量日里LSD的效果，我直接的抱怨不多。",
"下降期有时会让我有点郁闷，因为我好像把所有被提升的能力都花在了工作上。白天我会想着各种有意义的项目和爱好，可等到下班，我的精力已经被榨干了。不用药的时候，我有时也会因为一天的脑力消耗而觉得疲惫不堪，但这次是一种特别的累。我的大脑本身好像都累坏了、磨损了，就像突触和神经通路工作得太卖力了一样。在用LSD的日子里，我很少能有一股强劲的第二波精力，让我一直高效工作到深夜。",
"同样，在那些拖得很长、超过十或十二个小时的工作日里，到最后我的精力和动力都被彻底掏空了。这比我整天清醒工作时要明显得多。",
"哪怕是很少量的LSD，似乎也会抵消酒精的效果。在用药的日子里，晚上惯常喝的那几瓶啤酒，就没那么能带来熟悉的放松感和微醺感了。喝酒的欲望没有减少，只是喝起来没那么享受了。",
"中性方面 | 补充说明",
"虽然我对LSD很熟悉，但要适应在工作中定期处于用药状态，还是花了点时间。有些时候会突发状况，比如跟老板意外打交道，或者碰上紧急救火的场面，这时我觉得LSD是在拖后腿，而不是帮忙。通常表现为轻微的时间拉长感和轻度的思维混乱，当我想回忆过去关于复杂数据文件的逻辑细节和决策时，这两样都很不舒服。即便这些负面影响只是一时的，也让我开始怀疑，那些温和的好处到底值不值得。",
"在迷你剂量的日子里，视觉效果非常少。偶尔我会发现自己在欣赏一束闪着灰尘的阳光，或者别的什么自然之美，愉快地分了神。我从来没到过视野出现“呼吸”或图案的程度。大多数剂量下都有一些轻微的颜色饱和度提升和视觉噪点。",
"食欲",
"大约一半的迷你剂量日里，我的食欲都受到了轻微抑制。和大剂量不同，这种效果只持续到当天强度高峰过后不久。我通常会在服用LSD前后半小时内吃一顿清淡的早餐，有水果、酸奶和格兰诺拉麦片。之后要到下午三四点，通常是T + 05:30或更晚，才会再觉得饿。这种推迟的午餐时间既不难受，也不麻烦。我本来很容易“饿怒”，也就是一饿就发火，但用LSD的时候这种情况一次都没发生过。",
"生理指标",
"- 起始体重：187磅",
"- 结束体重：185磅（与用药无关）",
"- 心率备注：没什么值得一提的，无论是平时还是某次单独的情况，都没有变慢或变快。",
"- 性方面的效应：未发现。",
"- 睡眠方面的效应：我没遇到任何问题，不过我从来没有在上午11点以后服用过。没有发现梦境回忆或梦境内容有什么变化。",
"精神效应",
"- 创造力：绝对有提升，尤其是在服用后的头几个小时。有意思的是，在稍小一些的剂量下，即使是在高峰期，我也没能获得这种被增强的解题能力。我得用到迷你剂量的中高区间，而且只有在起效期，才能解锁那种为复杂问题找到独特解法的能力。我觉得要是没有LSD，这些问题我得花更长时间才能解决。在我每天的笔记里，“提前想好几步”和“看见即将到来的障碍”是常客。",
"- 专注力：我没法说这个月的实验给了我很强的“激光般的专注力”。偶尔有那么几天，我会感觉被工作吸了进去，几个小时不知不觉就过去了，我沉浸在工作里，看表时都会又惊又喜。但从没有过那种连着好几个小时过去、我对时间流逝严重估错的日子，就像更经典的“娱乐剂量”下会发生的那样。",
"- 社交效应：在为这个项目记录的这一个月微剂量和迷你剂量期间，没有什么特别明显的正面效果。值得一提的是，由于新冠疫情打乱了办公室的工作，我所有的工作往来都是通过文字和视频聊天进行的。",
"有几次，我对自己的用药状态感到困惑、不知所措又紧张。脑子里会积起一股压力，几乎像一种挠不到的痒。我挣扎着，却甩不掉这种难受的感觉，和同事打交道时它会让我分心。一旦和别人打交道这个压力源被拿掉，通常就会好控制一些，但有时它会一直缠着我，直到LSD的效果完全退去。伴随这些感觉的念头是：“我能撑过去，但这确实让我的一天更难熬了。”真是得不偿失。",
"情绪效应",
"我选择把这一部分按时间段来划分，因为在月底回顾笔记时，我发现情绪变化最明显的规律都和特定的时间线有关。下面的说法几乎适用于所有用LSD的日子。",
"- 体验中段：总的来说，从起效开始，在体验的大部分时间里，都有一层积极的光泽，也就是情绪变好了。我对接手任务、和难缠的同事打交道都更有干劲了。每一天看起来都更像是一堆机会，而不是一张沉闷的待办清单。",
"- 下降期：快下班的时候，随着药效消失，我几乎总是被彻底掏空了。",
"我比整天清醒度过时还要累。这种疲惫既是身体上的，也是精神上的。我“平常”的晚上往往很充实：写东西、打台球、做家务，或者干其他一大堆该干的事。可在迷你剂量的日子里，我发现自己更多地在看网飞、躺着发呆，拖延的次数也多得多。",
"- 第二天（及之后几天）：月初和月末的“休息日”里，我的情绪没什么区别。这套方案没有带来任何累积效应，无论是正面还是负面的。有时候（根据我的笔记，大约30%的情况）用药后的第二天早上，我会有一点轻微的余晖感。那是一种放松、平静的感觉。压力比平常清醒的日子来得更慢。最多几个小时后，这种感觉就完全消散了。有意思的是，大约10%的时候，这种余晖会在第二个“休息日”的早上再回来一次。除了这种“一觉醒来神清气爽”的感觉之外，我没发现别的明显的“第二天”效应。",
"躯体效应",
"在这一个月用LSD的经历中，唯一能归到“躯体效应”里的共同点，就是我的记录里反复出现的发冷。我的脚趾和手指本来就血液循环不好，小剂量的LSD让这个问题更严重了。在用药的日子里，换一双稍厚的羊毛袜，穿一件更厚的麂皮衬衫，通常就足以赶走寒意。",
"药物联用",
"请注意，下面的说明仅限于我的微剂量和迷你剂量LSD与其他物质之间的少数几次相互作用。大多数第二种物质都是在主要物质LSD的体验过了至少一半之后才用的。",
"- 大麻：在这一个月里，我在LSD体验的几乎每个阶段都某个时候搭配过大麻，通常是用烟油笔雾化。这些大麻的量一直都比较轻，每次吸2到5口中等大小的。加入大麻后，LSD的所有效果都会成倍放大。不管我当时是什么感觉，都会被扩大：好心情变成让人兴奋的冲劲，悄悄冒头的担忧膨胀成真正的偏执。加大麻就像掷骰子，不过结果我通常还能控制，只要我感到哪怕一丁点紧张或不安，就不碰大麻。",
"- 酒精：我不喜欢这个组合。我没法像平时那样享受酒精带来的镇静微醺感。我能比平时喝得多，但感觉到的效果却少得多。除此之外，没发现什么值得一提的协同作用。",
"- 氯胺酮：有几次，我在迷你剂量日的晚上用了氯胺酮和/或艾司氯胺酮。我没发现LSD和氯胺酮之间有任何增效或相互作用。说白了，我这么做的时候根本不算“联用”，和我单独用氯胺酮没有任何区别。",
"- MDMA：这个月我用过两次MDMA。一次是早上少量配合LSD使用，另一次是在一个“用药日”的周五晚上，为了娱乐用了中等剂量。小剂量那次是45毫克，我在吞下当天的LSD后马上鼻吸了。这加强了LSD的效果，尤其是在动力和精力方面，这一点毫不意外。LSD的精神效应，特别是思维混乱，被这种兴奋剂带来的积极感软化了，或者说被推到了背景里。我没有很强的补量冲动，也没有像单用MDMA时那样想往更娱乐的方向发展。大剂量那次是145毫克，口服，大约在LSD服用后的T + 11:00。那次我没感觉到两种物质之间有任何相互作用。MDMA的体验比LSD强得多，它一起效，LSD残留的那点微弱感觉就被彻底抹掉了。",
"结果 | 总结 | 心得",
"只有两次，我觉得LSD真的有害或者让人难受。那两天我稍微加了点剂量，指望工作量轻一点、效果强一点。可惜事情突然冒了出来，在药效高峰前后，我被迫去处理一些节奏很快的紧急任务。这是我自找的风险，是在拿工作的不可预测性赌博。",
"回头全面看这一个月用LSD的经历，我觉得它很有意思，有时也很有用，但它并不是很多人所说的那种一劳永逸、包治百病的万灵药。那些神奇的时刻，我意识到自己正在飞速越过障碍，解开逻辑迷宫就像手里握着所有捷径的钥匙，真的让人醍醐灌顶。这就是我想象中，在完美世界里，按计划服用迷你剂量LSD每一次、每时每刻应该有的样子。",
"可惜，这些顿悟的时刻并不经常出现，事实上远远谈不上经常。甚至不到一天一次，大概三天才有一次。这些偶尔出现的清明时刻虽然神奇，它们为什么、又是怎样发生的也极其耐人寻味，但被多得多的时候抵消掉了，那些时候我要么几乎没感觉，要么感受到了明显的负面效果。对我个人来说，这个月很新奇，也有用，但不是我想纳入长期日常的东西。这个月结束后，我又用过几次迷你剂量，但通常都在周末，也就是我想给自己加点劲、又完全不会被卷进意外高压局面的日子。能掌控体验的情景，似乎缓解了我在这些小剂量LSD中遇到的很多负面问题。可惜以我的工作情况来说，这根本做不到，于是LSD在我的工作安排里只能算勉强合适。"
];

const chineseDosechart = [
"剂量：", "7.14 微克", "口服", "LSD", "（液体）",
" ", "8.568 微克", "口服", "LSD", "（液体）",
" ", "11.424 微克", "口服", "LSD", "（液体）",
" ", "5.7 微克", "口服", "LSD", "（液体）",
" ", "8.568 微克", "口服", "LSD", "（液体）",
" ", "14.28 微克", "口服", "LSD", "（液体）",
" ", "12.852 微克", "口服", "LSD", "（液体）",
" ", "12.852 微克", "口服", "LSD", "（液体）",
" ", "12.852 微克", "口服", "LSD", "（液体）"
];

const chineseFootdataTopic = "LSD (2)：工作场所 (51)，个人准备 (45)，宿醉/后续几天 (46)，表现增强 (50)，回顾/总结 (11)，药物联用 (3)";

const chineseBodyweight = "185 磅";



let s="";
// 0表示从网页中提取中文
// 1表示将中文填入翻译
const translate = 1;
const captionText = "中文翻译by @SalviaSWC";




// ================== 2. 选择器 ==================
const titleSelector = 'div.title';
const substanceSelector = 'div.substance';
const bodySelector  = 'div.report-text-surround';
const dosechartSelector  = 'table.dosechart';
const bodyweightSelector = 'table.bodyweight';
const footdataTopicSelector  = 'td.footdata-topic-list';

// ================== 3. 你的本地字体 + 样式 ==================
const customFont   = "南西新圆体";
const fontSize     = "22px";
const fontSizeTitle     = "34px";
const fontSizeDosechart = "16.5px";
const textColor    = "#3e82e7";
const textColorTitle    = "#445ce6";
const textColorDosechart    = "#4a7ac1";
// const textColor    = "#083f91";
// const textColorTitle    = "#04508e";
// const textColorDosechart    = "#00234e";
const lineHeight   = "1.3";
const paraMargin   = "1px 1 1px 1";

// ================== 以下代码基本无需修改 ==================


// 先清理之前注入过的中文，避免重复运行时叠加
document.querySelectorAll('.cn-translation, .cn-dose-translation-row').forEach(el => el.remove());

document.querySelectorAll('.pullquote-right1').forEach(el => {
    const parent = el.parentNode;
    
    // 1. 先移除目标元素
    el.remove();
    
    // 2. 对父元素调用 normalize()，它会自动把左右相邻的纯文本节点（包括引号等）合并成一个
    if (parent) {
        parent.normalize();
    }
});


document.normalize() // 删除神秘元素

// 删除所有HTML注释元素

document.querySelectorAll('*').forEach(el => {
  [...el.childNodes].forEach(child => {
    if (child.nodeType === Node.COMMENT_NODE) {
      child.remove();
    }
  });
});

function applyCnStyle(el, cls, extraCss = '') {
  el.classList.add(cls);
  if (cls=='title')
  {
    el.style.cssText = `
    font-family: "${customFont}", "Microsoft YaHei", "Noto Sans SC", sans-serif !important;
    font-size: ${fontSizeTitle} !important;
    line-height: ${lineHeight} !important;
    color: ${textColorTitle} !important;
    ${extraCss}
  `;
  }
  else if (cls=='substance')
  {
    el.style.cssText = `
    font-family: "${customFont}", "Microsoft YaHei", "Noto Sans SC", sans-serif !important;
    font-size: ${fontSize} !important;
    line-height: ${lineHeight} !important;
    color: ${textColorTitle} !important;
    ${extraCss}
  `;
  }
  else if (cls=='dosechart-chinese-entry' || cls=='bodyweight-title' || cls=='bodyweight-amount'||cls=='footdata-topic-list')
  {
    el.style.cssText = `
    font-family: "${customFont}", "Microsoft YaHei", "Noto Sans SC", sans-serif !important;
    font-size: ${fontSizeDosechart} !important;
    color: ${textColorDosechart} !important;
    ${extraCss}
  `;
  }
  else
  {
    el.style.cssText = `
    font-family: "${customFont}", "Microsoft YaHei", "Noto Sans SC", sans-serif !important;
    font-size: ${fontSize} !important;
    line-height: ${lineHeight} !important;
    color: ${textColor} !important;
    margin: ${paraMargin} !important;
    ${extraCss}
  `;
  }

  return el;
}

function makeCnBlock(text, cls, tag = 'p', extraCss = '') {
  const el = document.createElement(tag);
  applyCnStyle(el, cls, extraCss);
  el.textContent = text;
  return el;
}

// ---------- A1. 插入标题中文 ----------

let cnt = 0;

const titleEl = document.querySelector(titleSelector);
if (titleEl && translate && chineseParas[cnt]) {
  const title = makeCnBlock(
    chineseTitle,
    'title', 
    'div',
    'font-weight: 700 !important; margin: 6px 0 12px 0 !important;'
  );
  titleEl.after(title);
} else if (! translate){
  s += `<titleText>${titleEl.textContent}</titleText>\n`;
}

// ---------- A2.插入药物中文 ----------

const substanceEl = document.querySelector(substanceSelector);

if (substanceEl &&translate&& chineseParas[cnt]) {
  const substance = makeCnBlock(
    chineseSubstances,
    'substance', 
    'div',
    'font-weight: 700 !important; margin: 6px 0 12px 0 !important;'
  );
  substanceEl.after(substance);
} else if (!translate){
  s+=`<substancesText>${substanceEl.textContent}</substancesText>\n`;
}




// ---------- C. 插入正文中文 ----------
// Erowid 这里正文不是 p，而是 report-text-surround 下的直接文本节点


const bodyWrap = document.querySelector(bodySelector);

// 插入水印

const captionTable = bodyWrap.firstElementChild;

const captionSalvia = document.createElement('div');
captionSalvia.style.opacity = 0.15;
captionSalvia.textContent = captionText;

captionTable.appendChild(captionSalvia);

if (!bodyWrap) {
  console.error('❌ 没找到正文容器');
} else {

  // 移除连续的<br>标签
  const bodyBrEls = bodyWrap.querySelectorAll('br');
  bodyBrEls.forEach(el => {
    let next = el.nextSibling;
    while (next && next.nodeName === 'BR') {
      const toRemove = next;
      next = next.nextSibling;
      toRemove.remove();
    }
  });

  

  const bodyTextNodes = [...bodyWrap.childNodes].filter(node => { 
    return (
      (node.nodeType === Node.TEXT_NODE ||
        node.nodeName == "SPAN" ||
        node.nodeName == "B"
      ) &&
      node.textContent.trim().length > 0
    );
  });

  if (bodyTextNodes.length === 0) {
    console.error('❌ 没找到正文段落文本节点');
  } else {
    bodyTextNodes.forEach((textNode, i) => {
      if (translate)
      {
        const cnPara = makeCnBlock(chineseParas[i], 'p');
        textNode.after(cnPara);
      }
      else
      {
        s += `<p>${textNode.textContent}</p>\n`;
      }
    });

    
  }
}

// D.插入末端表中文(TBD)

const footdataTopicEl = document.querySelector(footdataTopicSelector);
if (footdataTopicEl && translate) {
  const footdataTopic = makeCnBlock(
    chineseFootdataTopic,
    'footdata-topic-list', 
    'td',);
  footdataTopic.setAttribute("colspan", "2")
  const chineseTr = document.createElement('tr')
  chineseTr.appendChild(footdataTopic)
  footdataTopicEl.parentNode.after(chineseTr);
} else if (!translate){
  s += `<footdataTopicText>${footdataTopicEl.textContent}</footdataTopicText>`;
}

// document.querySelectorAll('br').forEach(el => el.remove()); // 删除神秘空行

// E.插入剂量表中文

const dosechartEl = document.querySelector(dosechartSelector);
const dosechartColumnNum = dosechartEl.firstElementChild.firstElementChild.childElementCount;
const dosechartRowNum = dosechartEl.firstElementChild.childElementCount;
let currentDosechartRow = dosechartEl.firstElementChild.firstElementChild;
let currentDosechartEl = currentDosechartRow.firstElementChild;

if (dosechartEl && chineseDosechart) {
  for(let i=0;i<dosechartRowNum;i++)
  {
    const chineseTr = document.createElement('tr'); 
    if (!translate)
    {
      currentDosechartEl = currentDosechartRow.firstElementChild;
      s += `<doseChartRow>`
    }
    for(let j=0;j<dosechartColumnNum;j++)
    {
      if (translate)
      {
        let align=undefined;
        if (j==0){align="right";}
        else if (j==1||j==2){align="center";}
        const chineseDosechartEntry = makeCnBlock(
          chineseDosechart[i*dosechartColumnNum+j], 
          'dosechart-chinese-entry', 
          'td', 
        )
        if (align) {
          chineseDosechartEntry.setAttribute('align', align);
        }
        chineseTr.appendChild(chineseDosechartEntry);
      }
      else
      {
        s += `<doseChartText>${currentDosechartEl.textContent}</doseChartText>`
        currentDosechartEl = currentDosechartEl.nextElementSibling;
      }

    }
    if (translate)
    {
      currentDosechartRow.after(chineseTr);
    }
    else
    {
      s += `</doseChartRow>/n`
    }
    currentDosechartRow = currentDosechartRow.nextElementSibling;
    if (translate)
    {
      currentDosechartRow = currentDosechartRow.nextElementSibling;
    }
    
    
  }
} else {
  console.warn('⚠️ 没找到尾注，或 chineseDosechart 为空');
}

// F.插入体重中文

const bodyweightEl = document.querySelector(bodyweightSelector);
if (bodyweightEl && translate && chineseBodyweight ) {
  const cnBodyweightTr = document.createElement('tr');
  const cnBodyweightTitle = makeCnBlock(
    '体重:', "bodyweight-title", "td"
  )
  const cnBodyweightAmount = makeCnBlock(
    chineseBodyweight, 'bodyweight-amount', "td"
  )
  cnBodyweightTr.appendChild(cnBodyweightTitle);
  cnBodyweightTr.appendChild(cnBodyweightAmount);
  bodyweightEl.firstElementChild.firstElementChild.after(cnBodyweightTr);

} else if (! translate && bodyweightEl) {
  s += `<bodyWeightText>${bodyweightEl.firstElementChild.firstElementChild.lastElementChild.textContent}</bodyWeightText>`;
}

// 移除bodyWrap所有<br>

bodyWrap.querySelectorAll('br').forEach(el => el.remove());

// 输出文档

if (translate)
{
  s = `# ${chineseTitle}`;

  let substances = chineseSubstances.slice(0, chineseSubstances.length - 1).join(", ");

  if (chineseSubstances.length > 1)
  {
    substances += "&";
  }

  substances += chineseSubstances[chineseSubstances.length - 1];

  s += `——${substances}\n\n`;

  s += "[◀返回](index.md)\n\n";

  s += `原文网址：<${document.URL}>\n\n`

  // | 时间       | 剂量     | 给药方式 | 物质                  | 形式          |
  // |------------|----------|----------|-----------------------|---------------|
  // | 剂量： |3片   | 口服 | LSD | 邮票  |
  // |    |  |  口服   |  大麻 - 高THC  | 食物 |
  // |    |  |  抽吸   |  大麻   | 食物 |
  // |    |  |  吸食   |  一氧化二氮   |  |

  // 注：“形式”可能没有

  let t;
  const doseChinese = "剂量：";

  if (dosechartColumnNum==5)
  {
    t=`| 时间       | 剂量     | 给药方式 | 物质                  | 形式          |\n|------------|----------|----------|-----------------------|---------------|\n`;
    for(let i=0;i<dosechartRowNum;i++)
    {
      if (i==0)
      {
        t+=`|剂量： ${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} | ${chineseDosechart[i*dosechartColumnNum+4]} |\n`;
      }
      else
      {
        t+=`| ${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} | ${chineseDosechart[i*dosechartColumnNum+4]} |\n`;
      }
      
    }
  }
  else{
    t=`| 时间       | 剂量     | 给药方式 | 物质                  |\n|------------|----------|----------|-----------------------|\n`;
    for(let i=0;i<dosechartRowNum;i++)
    {
      if (i==0)
      {
        t+=`|剂量：${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} |\n`;
      }
      else
      {
        t+=`| ${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} |\n`;
      }
      
    }
  }

  s += t + "\n";

  if (chineseBodyweight)
  {
    s += `|体重:| ${chineseBodyweight}|\n|---|---|   \n\n`;
  }

  for(let i=0;i<chineseParas.length;i++)
  {
    s += chineseParas[i] + "\n\n";
  }

  s += chineseFootdataTopic + "\n\n";
  
}



console.log(s);

/*


<fileTree>FreeODwiki/ ( 关于本站/ ( FreeOD引论.md Markdown语法指南.md 免责声明.md 如何做出你的第一个贡献.md 实用链接.md 常见问题.md 文档翻译指南和提示词.md 本站精神.md 隐私条款.md ) 文档/ ( 特色条目/ ( index.md ) 药物分类/ ( 2,5-二甲氧基苯丙胺类物质.md 2,5-二甲氧基苯乙胺类物质.md 4-硫基-2,5-二甲氧基苯乙胺类物质.md index.md N-苄基苯乙胺类物质.md NMDA受体拮抗剂类药物.md β-咔啉类物质.md κ-阿片受体激动剂类药物.md 二芳基乙胺类物质.md 亚甲双氧基苯类物质.md 促梦剂.md 促醒剂.md 共情剂.md 兴奋剂.md 加巴喷丁类物质.md 卡西酮类物质.md 合成大麻素类物质.md 吗啡喃类物质.md 吡咯烷基苯基酮类物质.md 吡咯烷类物质.md 吸入剂.md 哌啶类物质.md 哌嗪类物质.md 噻吩二氮䓬类物质.md 大麻类.md 宗教致幻剂.md 巴比妥类物质.md 托烷类物质.md 抑制剂.md 拉西坦类物质.md 环烷基胺类物质.md 生物碱类物质.md 益智药.md 致幻剂.md 色胺类物质.md 芳基环己胺类物质.md 苄基哌啶类物质.md 苯丙烯类物质.md 苯丙胺类物质.md 苯乙胺类物质.md 苯二氮䓬类物质.md 苯并呋喃类物质.md 药物全索引.md 解离剂.md 谵妄剂.md 迷幻剂.md 金刚烷类物质.md 阿片类药物.md 阿米雷司类物质.md 骆驼蓬生物碱.md 麦角酸酰胺类物质.md 黄嘌呤类物质.md 鼠尾草素类物质.md ) D-柠檬烯食醋DMT提取术.md DPT游离碱转化术.md GABA.md HPPD.md index.md od.md P物质.md SSRI.md 不建议使用的药物.md 不建议使用的词汇.md 乙酰胆碱.md 信号转导.md 催眠药.md 共享注射用材料.md 兴奋剂精神病.md 兴奋剂自慰.md 冥想.md 冷水萃取术.md 减量戒断法.md 前药列表.md 单胺.md 单胺氧化酶抑制剂.md 危险药物联用.md 去甲肾上腺素.md 受体.md 受体拮抗剂.md 受体激动剂.md 受体负向变构调节剂.md 受体逆向激动剂.md 可卡因合成术.md 可逆性MAOA抑制剂.md 复现索引.md 多巴胺.md 多药联用列表.md 大麻巧克力.md 大麻种植术.md 大麻饼干.md 大麻黄油制作.md 天然药物来源.md 娱乐性用药.md 孢子印.md 室外蘑菇种植术.md 常见合法药物表.md 异构体.md 强制断药戒断法.md 恢复体位.md 恶性旅程.md 情景与心境.md 愈美分离术.md 感官剥夺.md 抗抑郁药.md 抗精神病药.md 抗组胺药.md 教学索引页.md 旅程保姆.md 未知成分策划药的危害.md 止痛药阿片类药物提取术.md 正向变构调节剂.md 死藤水三明治.md 死藤水制备指南.md 死藤水烹饪术.md 毒蝇伞：异噁唑酸脱羧为蝇蕈醇.md 氢氧化钠石脑油法DMT提取术.md 水发酵术.md 治疗指数.md 液体容量给药法.md 清明梦.md 清明梦探索.md 激素.md 濒死体验.md 癫痫发作.md 睡眠瘫痪.md 研究用化学品.md 神经元.md 神经递质.md 神经递质再摄取抑制剂.md 神经递质释放剂.md 科学信息索引页.md 突触.md 简易麦斯卡林酿造技巧.md 精神探索.md 精神活性巧克力.md 糙米粉赛洛西宾蘑菇种植术.md 组胺.md 终止旅程.md 给药剂量.md 给药途径.md 罂粟种子茶.md 肾上腺素.md 舒尔金评级量表.md 药效下降期.md 药效时长.md 药物分类.md 药物剂量分类.md 药物剂量量取.md 药物前药.md 药物戒断反应.md 药物过量.md 蘑菇茶及其制备.md 蟾毒素列表.md 血清素-去甲肾上腺素再摄取抑制剂.md 血清素.md 血清素综合征.md 血脑屏障.md 试剂检测套件.md 谷氨酸.md 负责任的用药索引页.md 较安全的注射指南.md 迷幻剂旅程保姆.md 迷幻疗法.md 配体.md 镇静剂.md 阿托品颠茄提取术.md 黑巧克力奶.md 鼻腔喷雾指南.md ) 药效/ ( index.md 不可名状的恐怖.md 不宁腿.md 不适性身体效应.md 不适性躯体效应.md 专注力强化.md 专注力抑制.md 个人偏见抑制.md 个人意义强化.md 主观效应索引.md 亮度改变.md 人格解体.md 人格退化.md 体味改变.md 体温升高.md 体温调节抑制.md 便秘.md 偏执.md 共情、情感和社交能力增强.md 兴奋.md 内省增强.md 内部幻觉.md 几何.md 出汗增加.md 分析能力增强.md 分析能力抑制.md 分离层级.md 分离效应.md 创造力增强.md 创造力抑制.md 剂量独立强度.md 动力抑制.md 动机增强.md 医用药物表.md 去抑制.md 口干.md 口腔麻木.md 听觉幻觉.md 听觉扭曲.md 听觉效应.md 听觉锐度增强.md 听觉锐度抑制.md 呕吐.md 周边信息误判.md 味觉增强.md 味觉幻觉.md 呼吸增强.md 呼吸抑制.md 咳嗽抑制.md 唾液分泌增加.md 嗅觉与味觉效应.md 嗅觉增强.md 嗅觉幻觉.md 嗅觉抑制.md 困倦.md 场景、布景和景观.md 复视.md 外部幻觉.md 多感官效应.md 多重思维流.md 天然来源表.md 失忆.md 头晕.md 头痛.md 妄想.md 存在主义自我实现.md 宣泄.md 宿命论感知.md 对称纹理重复.md 尿频.md 幻觉状态.md 幽默感增强.md 强迫性补量.md 影子人.md 心律异常.md 心率减慢.md 心率增快.md 心理效应.md 心血管效应.md 快感缺失.md 思维减速.md 思维加速.md 思维循环.md 思维混乱.md 思维组织.md 思维连通性.md 性欲减退.md 性欲增强.md 性高潮抑制.md 恶心.md 恶心抑制.md 情感抑制.md 情景与情节.md 情绪强化.md 惊恐发作.md 感知到接触意识的内在机制.md 成分可控性.md 成瘾抑制.md 抑郁.md 抑郁减轻.md 排尿困难.md 支气管扩张.md 放大.md 新型认知状态.md 新奇感增强.md 既视感.md 时间扭曲.md 时间缩放.md 易怒.md 暂时性勃起功能障碍.md 暗示性强化.md 暗示性抑制.md 机械景观.md 梦境强化.md 梦境抑制.md 概念性思维.md 模式识别增强.md 模式识别抑制.md 正念.md 残影.md 永恒主义感知.md 沉浸感强化.md 流泪.md 流涕.md 深度感知扭曲.md 混乱.md 清醒.md 漂移.md 濒死感.md 灵性增强.md 焦虑.md 焦虑抑制.md 物体改变.md 物体激活.md 狂笑.md 环境切片.md 环境图案化.md 环境球体化.md 环境立体主义.md 现实感丧失.md 畏光.md 痰液增多.md 瘙痒感.md 癫痫发作.md 癫痫发作抑制.md 皮肤潮红.md 相互依存的对立面感知.md 眼球滑动.md 瞳孔扩大.md 瞳孔缩小.md 磨牙.md 空间定向障碍.md 精神病发作.md 纹理液化.md 统一感与互联感.md 耐力增强.md 肌肉收缩.md 肌肉松弛.md 肌肉痉挛.md 肌肉紧张.md 肌肉颤动.md 胃痉挛.md 胃胀.md 背痛.md 脑电击感.md 脑血管效应.md 脱水.md 腹泻.md 自主实体.md 自发性情感.md 自发性躯体感觉.md 自发性躯体运动.md 自我替换.md 自我死亡.md 自我膨胀.md 自我设计感知.md 自杀意念.md 血压升高.md 血压降低.md 血管扩张.md 血管收缩.md 衍射.md 视物振动.md 视觉分离.md 视觉加工减慢.md 视觉加工加速.md 视觉变形.md 视觉增强.md 视觉扭曲.md 视觉抑制.md 视觉拉伸.md 视觉拖尾.md 视觉效应.md 视觉翻转.md 视觉迷雾.md 视觉递归.md 视觉锐度增强.md 视觉锐度抑制.md 视角幻觉.md 触觉增强.md 触觉幻觉.md 触觉抑制.md 触觉效应.md 认知不快.md 认知减退.md 认知增强.md 认知强化.md 认知抑制.md 认知效应.md 认知欣快.md 认知疲劳.md 记忆回放.md 记忆增强.md 记忆抑制.md 语无伦次.md 语言能力抑制.md 谵妄.md 超个人效应.md 躁狂.md 身份改变.md 躯体分离.md 躯体压力感.md 躯体增强.md 躯体形态感改变.md 躯体抑制.md 躯体控制增强.md 躯体改变.md 躯体效应.md 躯体欣快感.md 躯体沉重感.md 躯体疲劳.md 躯体自主.md 躯体轻盈感.md 过度打哈欠.md 运动控制丧失.md 返老还童感.md 透视扭曲.md 通感.md 重力感改变.md 镇痛.md 镇静.md 音乐欣赏能力增强.md 颜色偏移.md 颜色增强.md 颜色抑制.md 颜色替换.md 颜色染色.md 食欲增强.md 食欲抑制.md ) 药物/ ( 1,4-丁二醇.md 1B-LSD.md 1cP-AL-LAD.md 1cP-LSD.md 1cP-MiPLA.md 1P-ETH-LAD.md 1P-LSD.md 1V-LSD.md 2,5-DMA.md 2-AI.md 2-DPMP.md 2-FA.md 2-FDCK.md 2-FEA.md 2-FMA.md 2-MMC.md 25B-NBOH.md 25B-NBOMe.md 25C-NBOH.md 25C-NBOMe.md 25D-NBOMe.md 25I-NBOH.md 25I-NBOMe.md 25N-NBOMe.md 2C-B-FLY.md 2C-B.md 2C-C.md 2C-D.md 2C-E.md 2C-EF.md 2C-H.md 2C-I.md 2C-P.md 2C-T-2.md 2C-T-21.md 2C-T-7.md 2C-T.md 2M2B.md 3,4-CTMP.md 3-Cl-PCP.md 3-CMC.md 3-FA.md 3-FEA.md 3-FMA.md 3-FPM.md 3-HO-PCE.md 3-HO-PCP.md 3-Me-PCP.md 3-Me-PCPy.md 3-MeO-PCE.md 3-MeO-PCMo.md 3-MeO-PCP.md 3-MMC.md 3C-E.md 4-AcO-DET.md 4-AcO-DiPT.md 4-AcO-DMT.md 4-AcO-MiPT.md 4-CA.md 4-FA.md 4-FMA.md 4-FMC.md 4-HO-DiPT.md 4-HO-EPT.md 4-HO-MET.md 4-HO-MiPT.md 4-HO-MPT.md 4-MeO-PCP.md 4-MMC-MeO.md 4-MMC.md 4-甲基阿米雷司.md 4C-D.md 4F-EPH.md 4F-MPH.md 5-APB.md 5-HO-DMT.md 5-HTP.md 5-MAPB.md 5-MeO-DiBF.md 5-MeO-DiPT.md 5-MeO-DMT.md 5-MeO-MiPT.md 5-MeO-αMT.md 5F-AKB48.md 5F-PB-22.md 6-APB.md 6-APDB.md 8-氯茶碱.md AB-CHMINACA.md AB-FUBINACA.md AL-LAD.md ALD-52.md Alpha-GPC.md APICA.md BOD.md Bromo-DragonFLY.md bron.md DCK.md DET.md DiPT.md DMT.md DMXE.md DOB.md DOC.md DOI.md DOM.md DPD.md DPT.md EPH.md EPT.md FXE.md GBL.md GHB.md HXE.md index.md IPPH.md JWH-018.md JWH-073.md LAE-52.md lsa.md LSD.md LSM-775.md LSZ.md mCPP.md MDA.md MDAI.md MDEA.md MDEC.md MDMA.md MDMC.md MDNEB.md MDNEP.md MDNMB.md MDNMP.md MDPHP.md MDPV.md MET.md MiPLA.md MiPT.md MK-801.md MMDA.md MPT.md MXE.md MXiPr.md MXPr.md N-乙酰半胱氨酸.md N-甲基二氟莫达非尼.md N-甲基环唑酮.md NEH.md NEP.md NM-2-AI.md NMH.md NMP.md noopept.md O-PCE.md O-去甲曲马多.md PARGY-LSD.md PCE.md PCP.md PMA.md PMMA.md PRO-LAD.md RTI-111.md SAM-e.md Semax.md STS-135.md THJ-018.md THJ-2201.md TMA-2.md TMA-6.md U-47700.md win-1161-3.md α-PHP.md α-PiHP.md α-PVP.md αMT.md βk-2C-B.md 丁丙诺啡.md 三唑仑.md 丙戊酸.md 丙戊酸盐.md 丙氯拉嗪.md 乌羽玉.md 乙卡西酮.md 乙基吗啡.md 乙酰芬太尼.md 二氟莫达非尼.md 二氢去氧吗啡.md 二氢可待因.md 二氯地西泮.md 亚硝酸酯.md 亚铜绿裸盖菇.md 伊博格碱.md 伪麻黄碱.md 佐匹克隆.md 依替唑仑.md 依芬尼定.md 依非韦仑.md 侧柏酮.md 利右苯丙胺.md 利培酮.md 加兰他敏.md 加巴喷丁.md 加波沙多.md 劳拉西泮.md 匹卡米隆.md 卡瓦.md 卡痛.md 卡立普多.md 卡西酮.md 去氯依替唑仑.md 反苯环丙胺.md 古巴裸盖菇.md 可乐定.md 可卡因.md 可可.md 可待因.md 右丙氧芬.md 右美沙芬.md 司可巴比妥.md 司来吉兰+苯乙胺.md 吗啡.md 吡拉西坦.md 吡溴唑仑.md 吸入剂.md 咖啡因.md 咖啡属.md 咪达唑仑.md 哌甲酯.md 哮喘片.md 唑吡坦.md 喹硫平.md 噻奈普汀.md 圣佩德罗仙人掌.md 圣佩特罗仙人掌.md 地西泮.md 塔喷他多.md 墨西哥裸盖菇.md 墨西哥鼠尾草.md 复方甘草片.md 夏威夷小木玫瑰.md 多拉西敏.md 大果柯拉豆.md 大麻.md 大麻二酚.md 天仙子.md 奥拉西坦.md 奥氮平.md 安非他酮.md 尼古丁.md 尼氟西泮.md 巴氯芬.md 布罗曼坦.md 异丙嗪.md 愈美片.md 戊巴比妥.md 扎来普隆.md 普拉西坦.md 普瑞巴林.md 普罗斯卡林.md 普罗林坦.md 曲马多.md 曼陀罗.md 曼陀罗属.md 替利定.md 替扎尼定.md 替马西泮.md 橙黄鹅膏.md 死藤.md 死藤水.md 毒蝇伞.md 氟哌啶醇.md 氟氯替唑仑.md 氟溴唑仑.md 氟溴西泮.md 氟硝唑仑.md 氟硝西泮.md 氟菲尼布特.md 氟阿普唑仑.md 氟马西尼.md 氢可酮.md 氧化亚氮.md 氯氮平.md 氯硝唑仑.md 氯硝西泮.md 氯胺酮.md 氯苄雷司.md 泛相思汤.md 洛哌丁胺.md 海洛因.md 溴西泮.md 烟草.md 烟草属.md 烯丙艾斯卡林.md 牵牛花.md 环唑酮.md 环己丙甲胺.md 玻利维亚火炬仙人掌.md 甲丙氨酯.md 甲卡西酮.md 甲喹酮.md 甲基噻吩丙胺.md 甲基己胺.md 甲基烯丙基艾斯卡林.md 甲基苯丙胺.md 甲氧芬尼定.md 睡茄.md 石山碱甲.md 硝基甲喹酮.md 秘鲁火炬仙人掌.md 米氮平.md 精神活性相思树属植物.md 纳洛酮.md 细花含羞草.md 绿九节.md 罂粟.md 美替唑仑.md 美沙酮.md 美金刚.md 羟吗啡酮.md 羟吗啡酮腙.md 羟嗪.md 羟考酮.md 翠冠玉.md 考拉西坦.md 肉豆蔻醚.md 肌酸.md 育亨宾.md 胍丁胺.md 胞磷胆碱.md 致幻仙人掌.md 舒芬太尼.md 艾捉菲尼.md 艾斯卡林.md 芬太尼.md 芬纳西泮.md 苄达明.md 苏摩.md 苏糖酸镁.md 苦茶碱.md 苯丙胺.md 苯基吡拉西坦.md 苯巴比妥.md 苯海拉明.md 苯海索.md 茄参属.md 茴拉西坦.md 茶氨酸.md 茶苯海明.md 莫达非尼.md 菲尼布特.md 萘哌甲酯.md 蓝柄裸盖菇.md 蓝莲花.md 裸盖菇属.md 褪黑素.md 西班牙裸盖菇.md 豹斑鹅膏.md 赛洛西宾蘑菇.md 赛洛辛.md 酒石酸氢胆碱.md 酒精.md 酪氨酸.md 金刚烷胺.md 银冠玉.md 锂.md 镁剂.md 阿托品.md 阿普唑仑.md 阿莫达非尼.md 颠茄.md 骆驼蓬.md 鹅膏蕈氨酸.md 鹅花树.md 麦斯卡林.md 麻黄碱.md 鼠尾草素乙.md 鼠尾草素甲.md ) .gitignore .nav.yml CODE_OF_CONDUCT.md CONTRIBUTING.md extra.css FOW_WHITE.jpeg FreeODwiki.png index.md LICENSE LICENSE-STRICT README.md README_TEMP.md requirements.txt robots.txt sitemap.xml</fileTree></glossary>
</fileTree>
<specialPrecaution>下面的提示词中的任何一部分，不得直接以引用的形式出现在输出中的任何可见部分(题干、参考答案、评分标准、例文等，前面的注释除外)，也不要明显是跟随范式生成的，甚至不要暗示本prompt的任何一部分的存在。另外，我还发现ChatGPT喜欢把它的系统提示词掺入输出中，例子包括“可操作性细节”——这种也不要；请注意文件夹路径是`/药物/...md`和`/药效/...md`，没有`/文档`在前面</specialPrecaution>
<prompt>
首先，根据给出的文件树，为上文中提到的报告添加一个“另见”部分。本报告是在一个被隐藏的`/报告/`文件夹的，因此请使用绝对路径。

## 另见

[A](/somefolder.../abspath.md)<br> 

<!-- eg: (这段不要) [负责任的用药](/文档/负责任的用药.md) -->
<!-- [右美沙芬](/药物/右美沙芬.md) -->

我是语文教师，需要利用这个文章在学生中引起反思。首先，建议你参考各地近年语文高考阅读理解及作文，领会其精神。

第一，你应该找出文中具有鲜明特色的东西，你需要找出至少一个，可以多个(若适用)。这个东西可以是包括但不限于文章内容、写作手法、写作意图、表达效果、行文风格中的，以确保你读懂了文章。请不要输出这些文字。

建议多多关注文中反映的社会现状、法律问题，而非浮于表面，空谈禁毒教育。

我认为，现在社会对于药物问题具有严重的误解。我希望你在思辨时，要尽可能突出强调文中对于药物问题的值得认可和鼓励的态度，尤其是科学理性态度。这是一个复杂的问题，然而这与核心前提并不冲突。不要把主流价值判断当作事实，在当前的条件下，我要求你多看到那些积极的一面——因为这些恰恰是主流社会欠缺的部分。不要迎合主流价值判断，适可而止即可。只有展现主流价值判断所欠缺的部分，我们的阅读才能真正引起学生的深刻反思。不必每一道题都考虑主流社会的认可、法律、道德，有关这些主题的题目不超过2题。请聚焦在其他方面。你生成的文字可以有一些趣味性或幽默性的内容，减少学生对严肃材料和严肃思考有抵触。

请使用本文，模仿语文高考，生成阅读理解的题目和参考答案和给分点(i.e. 评分要点，请严格按照当前高考阅读的“给分点”范式写参考答案：自由裁量权较少的踩到哪一点就给相应部分的分的类型较多，但并非全部。具有自由给分裁量权的类型较少，但除非是概括文义等接近完全客观的题，可没有，否则不能太少或没有。)既要有以材料文本作为一个整体考察的题目，也有考察某一个具体对象（包括但不限于第某段第某句，某人物形象）的题目。要求考察内容多样，难而不偏，考察包括但不限于文章内容、写作手法、写作意图、表达效果、行文风格。注重药物在文中的作用。为了体现你的模型的实力，每一道题要求结合教材中的一篇课文(可以是诗词、文言文、现代文、必读篇目，但是自读课文除外)，形成对照阅读题，回归教材。题型，问法和考点要参考近几年真题和模拟卷。是简答题，不是选择题。生成5-7道左右。不少于5000字。每一题的字数应该大致均等。但是，如果出题会占用过多tokens，影响到你生成作文的篇幅或质量，则可以酌情减少。出题难度需要符合高考阅读理解中一篇阅读中的题目的难度趋势，一般为随题目编号的增加而递增；顺序在前面的题目中所总结出的东西或思考范式，也可以服务于后面的题目的思考。所以，你的出题应该有所预先规划。

对于有至少两个答题角度的开放性题目，请考虑各个答题角度、其给分标准。

你要基于文中的一个最有潜在争议的东西，出一个高考作文题目，具有高度的思辨性，可以认为考生已被提供了整个文章作为材料，所以题干中无需概述本文写了什么，题干也不宜过长，要求模仿历年高考作文。这个题目不要求结合教材，但需要结合给出的文章。给出作文题目分析、评分标准和可选角度。

你的参考范文至少要有3个。前面的范文属于所有人都可以学习的范文，其角度必须不同，必须展现出满足一类文要求的思辨，并给出打分。最后一个范文属于那种有机会满分的范文，特点是能够统筹不同的观点。但是，因为统筹不同的观点若写得不好，容易被视为空洞的“无立场墙头草”作文，所以只有较好的学生在深度思考过，才能写得好的。

再给出若干个问题作文，展示思考这个问题中的典型错误范式，并给出写得再漂亮、论证得再有力，这种问题作文能达到的最高分数估值。

特别注意：文中出现的给药表、体重等数据仅作参考，不要专门考察。

输出格式(请使用markdown中的html语法，粗体、斜体也请使用html标签)，使用<p>标签。请严格遵守格式，不要输出多余内容。

开头： 

<!-- 本文特点：...... -->



......

## 阅读理解

| ![Yellow-warning-sign1.svg](/文件/Yellow-warning-sign1.png) | 以下内容为AI生成，仅供参考！ |
|----|----|


<details markdown="1"> <summary> 奖励关：语文阅读理解练习+材料写作 </summary>

<h2>第几题：主要考点是什么（满分几分）</h2>

<h3>参考答案</h3>

<p>......</p>

......

<h3>评分要点</h3>

<p>......</p>

......

<h2>作文题目</h2>

<h3>题目分析</h3>

<h3>给分标准</h3>

<p>......</p>

......

<h3>范文1：题目（字数，给分）</h3>

......


<h3>问题作文n：题目【问题点】</h3>

<p>......</p>

</details></prompt>


*/

