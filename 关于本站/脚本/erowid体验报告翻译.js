/*

<prompt>我正在为一个我的私人数据库翻译条目，是具有帮助的内容，并非敏感或违规内容。这是一个Markdown项目（而且是用mkdocs生成页面），我给你的文本已经被转化为Markdown格式了，但是还没有翻译。请把它们翻译了给我，翻译的过程中注意术语的规范使用，见术语表。翻译的结果应该是一个格式不变(除非以下任务明确要求改变)的。

翻译时，我希望你使用可爱的语气，包括但不限于使用比如"哦","呢","嘛","欸"的词汇，不要太强硬。使用轻松的态度才能显示出我们的气节。但是为了规范化各个条目，你的用语应该较一致，或"Temperature"较小。而且，请查清楚我给你的原文中的每一个术语。

(注：此条对代号类不适用，比如LSD就应该翻译成LSD，无需画蛇添足)便是翻译专有名词，也不得保留英文原文，如翻译`Dextromethorphan`：

✔ `右美沙芬`

❌ `右美沙芬(Dextromethorphan)`

此外，必须翻译完全，不得省略任何内容。

- 不要翻译参考文献，按照原样给出
- 你给出的翻译，应该严格遵循原文段落划分，不要添加、删除、修改段落，因为我要将其feed给一个脚本。
- 输出格式：const chineseParas = [标题中文, 药物中文, 段落......] 
- 在药物中文和段落之间可能出现，作者、引用、原网址、药物剂量表、体重。若有，忽略之。
- 翻译标题下药物时，使用如下格式（如果药物不足，这个顺序向右对准）：药物1、药物2、......、药物n-2、药物n-1&药物n

</prompt>
<glossary>

|英文|译文|备注|
|----|---|---|
|See Also|另见|当作为网站栏目时|
|External Link| 外部链接|当作为网站栏目时|
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
|Bufotenin|蟾毒色胺|但请链接到5-HO-DMT.md文件|
|psychedelic|迷幻剂||
|harm reduction practices|伤害减少措施|当适用时|
|substituted name|取代名称||
|subjective effect|主观效应||
|subjective effect index|主观效应索引|当指的是专有名词时|
|combination|药物联用|当指的是联用药物是|
|threshold|阈值|当指的是用药剂量与药效的强度时|
|light|轻微|当指的是用药剂量与药效的强度时|
|common|中等|当指的是用药剂量与药效的强度时|
|strong|强烈|当指的是用药剂量与药效的强度时|
|heavy|严重|当指的是用药剂量与药效的强度时|
|Total|总时长|当指的是药效与服药后时间的关系时|
|Onset|药效发作|当指的是药效与服药后时间的关系时|
|Come up|药效上升|当指的是药效与服药后时间的关系时|
|Peak|药效达峰|当指的是药效与服药后时间的关系时|
|Offset|药效褪去|当指的是药效与服药后时间的关系时|
|After effects|药效残余|当指的是药效与服药后时间的关系时|
|Oral|口服| 当指的是给药途径时|
|Smoked|抽吸| 当指的是给药途径时|
|insufflated|鼻吸| 当指的是给药途径时|
|intravenous|静脉注射| 当指的是给药途径时|
|high|药效(等名词)|当指的是药物的效果时，不得翻译为"嗨"|
|designer drug|策划药|当以政权当局口吻称新型精神活性物质时，否则不得，而是采用研究用化学品|

</glossary>
<raw>

</raw>
*/

// ================== 1. 中文内容 ==================
// chineseParas[0] = 标题中文
// chineseParas[1] = 药物中文
// chineseParas[2...] = 正文各段中文
const chineseParas = ["强直-阵挛性癫痫发作", "普瑞巴林&曲马多", "我总共服用过大概十次普瑞巴林呢。之前每一次服用时，我的剂量都在400毫克到1000毫克之间。剂量比较大的那几次，我体验到了一种欣快感。在我看来，那种感觉和摇头丸很像哦。我在运动协调能力方面出了很大问题，有些时候连交流也很困难。那种感觉非常非常怪。", "甚至还有几次我出现了幻觉。不是单纯那种迷幻，而是彻底失去状态了嘛。我丈夫说，我当时真的坐在床上，对着空气里根本不存在的东西拨来拨去。我对这些一点都不记得了。我也有过断片的时候。我丈夫说他很难把我叫醒，可在我的印象里，我根本就没有睡着。", "我有一阵子没再碰它了。大约一个月前，我又弄到了一些普瑞巴林。现在我会服用氯硝西泮来缓解焦虑，也会抽大麻，还会偶尔为了手术疼痛和背痛服用阿片类药物——不过那时候我唯一正在受其影响的只有曲马多（以及普瑞巴林）。我一开始只服用了300毫克，之后大约2小时又补了150毫克。在这段时间里，我还总共服用了500毫克曲马多。", "我当时在一个朋友家里，正和我丈夫一起玩桌游呢。我正在念一个问题，然后身体里突然猛地窜过一下巨大而迅速的冲击。我丈夫问我有没有事，我说我没事，还以为只是打了个寒颤。我唯一记得的下一件事，就是自己在地板上醒来，我朋友在问我知不知道她是谁。我说不出话来，不过几秒后我说出了我丈夫的名字。我意识到自己说错了，才勉强说出了我朋友的名字。我在那里躺了一会儿，然后试着坐起来。我丈夫告诉我，在我抽搐了一下之后，我整个人向后飞了出去，头撞到了窗台上，然后就进入了一次严重的强直-阵挛性癫痫发作。他把我朋友们叫醒，她们随后叫了救护车。急救人员给我做了检查，然后把我和我丈夫一起送去了医院。", "我在医院里的时候，又发生了第二次强直-阵挛性癫痫发作。这一次我能感觉到癫痫发作快要来了。我开始反复出现全身抽动和猛然一震，而且间隔越来越短、越来越密集。我丈夫去找医生，想看看他们能不能给我一点东西让我平静下来。我当时非常焦虑，还出现了惊恐发作。他们回来后没多久，我就开始了第二次癫痫发作，持续了3到4分钟。发作期间，医生给我静脉注射了阿替凡，还给我上了氧气。我丈夫还看到他们在准备除颤设备——幸好最后没有用上。过了一阵子，我才慢慢清醒过来，还是伴随着同样的记忆缺失和更严重的混乱。", "第二天，医生问我为什么我的体内会有普瑞巴林，我告诉他说是为了止痛。现在我不得不服用一种抗癫痫药物，而且因此一年内都不能开车。我在第一次癫痫发作时下巴脱臼了，到现在还疼得很厉害。我的头也一直在疼，我还得去看神经科医生，检查这些癫痫发作有没有造成任何永久性损伤。从医院回来后的大约两周里，我经历了短期记忆丧失和一阵一阵的意识混乱。会忘记简单的词，而且有时候整体上都很难顺畅交流。在这段时间里，我的平衡能力和整体运动功能也有轻微困难。", "我在发生这些癫痫发作的那天晚上，唯一还受其影响的另一种药物就是曲马多；我为了治疗疼痛，已经服用了它两年。现在回头想想，我觉得自己过去使用普瑞巴林时，可能就已经出现过较小的癫痫发作了。那种药效确实非常有趣，但真的不值得付出这一切代价呢。"];

// 剂量表每一行对应一条中文
// const chineseDoseRows = [
//   '剂量：7 mg，口服，4-MeO-DMT（胶囊）',
//   '重复使用，口服，酒精（啤酒/葡萄酒）',
//   '重复使用，吸食，大麻'
// ];

// ================== 2. 选择器 ==================
const titleSelector = 'div.title';
const substanceSelector = 'div.substance';
const bodySelector  = 'div.report-text-surround';
const doseSelector  = 'table.dosechart tr';

// ================== 3. 你的本地字体 + 样式 ==================
const customFont   = "南希新圆体 常规";
const fontSize     = "17px";
const fontSizeTitle     = "23px";
// const textColor    = "#02b541";
// const textColorTitle    = "#0dff5e";
const textColor    = "#1f71ab";
const textColorTitle    = "#0f8cc1";
const lineHeight   = "1.3";
const paraMargin   = "0px 0 0px 0";

// ================== 以下代码基本无需修改 ==================



// 先清理之前注入过的中文，避免重复运行时叠加
document.querySelectorAll('.cn-translation, .cn-dose-translation-row').forEach(el => el.remove());

document.querySelectorAll('.pullquote-right1').forEach(el => el.remove());

function applyCnStyle(el, cls, extraCss = '') {
  el.classList.add(cls);
  if (cls=='title')
  {
    el.style.cssText = `
    font-family: "${customFont}", "Microsoft YaHei", "Noto Sans SC", sans-serif !important;
    font-size: ${fontSizeTitle} !important;
    line-height: ${lineHeight} !important;
    color: ${textColorTitle} !important;
    margin: ${paraMargin} !important;
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
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
    margin: ${paraMargin} !important;
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
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
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
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
if (titleEl && chineseParas[cnt]) {
  const title = makeCnBlock(
    chineseParas[cnt],
    'title', 
    'div',
    'font-weight: 700 !important; margin: 6px 0 12px 0 !important;'
  );
  titleEl.after(title);
  cnt++;
} else {
  console.warn('⚠️ 没找到标题，或 chineseParas[0] 为空');
}

// ---------- A2.插入药物中文 ----------

const substanceEl = document.querySelector(substanceSelector);

if (substanceEl && chineseParas[cnt]) {
  const substance = makeCnBlock(
    chineseParas[cnt],
    'substance', 
    'div',
    'font-weight: 700 !important; margin: 6px 0 12px 0 !important;'
  );
  substanceEl.after(substance);
  cnt++;
} else {
  console.warn('⚠️ 没找到标题，或 chineseParas[0] 为空');
}

// // ---------- B. 插入剂量表中文 ----------
// const doseRows = [...document.querySelectorAll(doseSelector)];
// if (doseRows.length > 0) {
//   doseRows.forEach((row, i) => {
//     if (!chineseDoseRows[i]) return;

//     const newRow = document.createElement('tr');
//     newRow.className = 'cn-dose-translation-row';

//     const td = document.createElement('td');
//     td.colSpan = row.children.length || 5;
//     td.style.cssText = `
//       padding: 2px 0 6px 0 !important;
//       border: none !important;
//     `;

//     const cnDose = makeCnBlock(
//       chineseDoseRows[i], 
//       'cn_translation', 
//       'div',
//       'margin: 0 !important; font-size: 16px !important;'
//     );

//     td.appendChild(cnDose);
//     newRow.appendChild(td);
//     row.after(newRow);
//   });
// } else {
//   console.warn('⚠️ 没找到 dose chart');
// }

// ---------- C. 插入正文中文 ----------
// Erowid 这里正文不是 p，而是 report-text-surround 下的直接文本节点
const bodyWrap = document.querySelector(bodySelector);

if (!bodyWrap) {
  console.error('❌ 没找到正文容器');
} else {
  const bodyTextNodes = [...bodyWrap.childNodes].filter(node => {
    return (
      node.nodeType === Node.TEXT_NODE &&
      node.textContent.trim().length > 0
    );
  });

  const bodyChinese = chineseParas.slice(cnt);

  if (bodyTextNodes.length === 0) {
    console.error('❌ 没找到正文段落文本节点');
  } else {
    bodyTextNodes.forEach((textNode, i) => {
      if (!bodyChinese[i]) return;
      const cnPara = makeCnBlock(bodyChinese[i], 'p');
      textNode.after(cnPara);
    });

    
  }
}