var plugin = requirePlugin("chatbot");
Component({
  properties: {
    msg: Object
  },

  data: {
    imageArray: [{
        url: "https://www.et.ynu.edu.cn/appdd/uploads/20181060080/8/小知老师9.jpg.png"
      },
      {
        url: "https://www.et.ynu.edu.cn/appdd/uploads/20181060080/8/%E5%B0%8F%E7%9F%A5%E8%80%81%E5%B8%886.jpg"
      },
      {
        url: "https://www.et.ynu.edu.cn/appdd/uploads/20181060080/8/%E5%B0%8F%E7%9F%A5%E8%80%81%E5%B8%887.jpg"
      },
      {
        url: "https://www.et.ynu.edu.cn/appdd/uploads/20181060080/8/%E5%B0%8F%E7%9F%A5%E8%80%81%E5%B8%886.jpg"
      },
      {
        url: "https://www.et.ynu.edu.cn/appdd/uploads/20181060080/8/小知老师9.jpg.png"
      }
    ],
    imgArr: [{
        url: "https://www.et.ynu.edu.cn/appdd/uploads/20181060080/8/%E5%AF%B9%E8%AF%9D%E6%A1%861.jpg"
      },
      {
        url: "https://www.et.ynu.edu.cn/appdd/uploads/20181060080/8/%E5%AF%B9%E8%AF%9D%E6%A1%861.jpg"
      },
      {
        url: "https://www.et.ynu.edu.cn/appdd/uploads/20181060080/8/%E5%AF%B9%E8%AF%9D%E6%A1%861.jpg"
      }
    ],
    url: "https://www.et.ynu.edu.cn/appdd/uploads/20181060080/8/%E5%8D%83%E5%BA%93%E7%BD%91_%E7%A7%91%E6%8A%80%E6%8C%89%E9%92%AE%E7%AB%8B%E4%BD%93%E6%A0%87%E9%A2%98%E6%A1%86_%E5%85%83%E7%B4%A0%E7%BC%96%E5%8F%B712582830.png",
    flag: false,
    list: [],
    score: 0
  },
  lifetimes: {
    ready: function () {
      let that = this;

      const facejson = {
        qqface: [
          "微笑",
          "撇嘴",
          "色",
          "发呆",
          "得意",
          "流泪",
          "害羞",
          "闭嘴",
          "睡",
          "大哭",
          "尴尬",
          "发怒",
          "调皮",
          "呲牙",
          "惊讶",
          "难过",
          "酷",
          "冷汗",
          "抓狂",
          "吐",
          "偷笑",
          "愉快",
          "白眼",
          "傲慢",
          "饥饿",
          "困",
          "惊恐",
          "流汗",
          "憨笑",
          "悠闲",
          "奋斗",
          "咒骂",
          "疑问",
          "嘘",
          "晕",
          "疯了",
          "衰",
          "骷髅",
          "敲打",
          "再见",
          "擦汗",
          "抠鼻",
          "鼓掌",
          "糗大了",
          "坏笑",
          "左哼哼",
          "右哼哼",
          "哈欠",
          "鄙视",
          "委屈",
          "快哭了",
          "阴险",
          "亲亲",
          "吓",
          "可怜",
          "菜刀",
          "西瓜",
          "啤酒",
          "篮球",
          "乒乓",
          "咖啡",
          "饭",
          "猪头",
          "玫瑰",
          "凋谢",
          "嘴唇",
          "爱心",
          "心碎",
          "蛋糕",
          "闪电",
          "炸弹",
          "刀",
          "足球",
          "瓢虫",
          "便便",
          "月亮",
          "太阳",
          "礼物",
          "拥抱",
          "强",
          "弱",
          "握手",
          "胜利",
          "抱拳",
          "勾引",
          "拳头",
          "差劲",
          "爱你",
          "NO",
          "OK",
          "爱情",
          "飞吻",
          "跳跳",
          "发抖",
          "怄火",
          "转圈",
          "磕头",
          "回头",
          "跳绳",
          "投降",
          "激动",
          "乱舞",
          "献吻",
          "左太极",
          "右太极"
        ]
      };

      const clicklink = /<a.*href=["']weixin:\/\/bizmsgmenu.*msgmenucontent=([^&"'>]*).*msgmenuid=([^&"'>]*)["']>.*<\/a>/g;
      let content = this.properties.msg.content;

      if (/\[([^\]]*)\]/.test(content)) {
        content = content.replace(/\[([^\]]*)\]/g, (txt, match) => {
          const index = facejson.qqface.indexOf(match);
          if (index > -1) {
            return (
              '<span class="ai-qqemoji" style="background-position: ' +
              that.getFacePosition(index) +
              '">' +
              match +
              "</span>"
            );
          }
          return txt;
        });
      }

      if (/<a.*>|<span.*>/.test(content)) {
        this.setData({
          isRitch: true,
          answer: content
        });
      }

      const result = this.properties.msg;
      const chat = plugin.getChatComponent();
      const score = result.content.replace(/.*评分\s*[:：]\s*(\d*)/, "$1");
      if (result.content.indexOf("评分") !== -1) {
        if (result.content.indexOf("100") !== -1) {
          that.setData({
            flag: true,
            url: "https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/win.png",
            score: 100
          });
        } else {
          that.setData({
            flag: true,
            url: "https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/dead.png",
            score: score
          });
        }
        chat.scrollToNew();
        return;
      }

      if (result.res.options && result.res.options.length !== 0) {
        result.res.options.forEach((item, index) => {
          if (that.data.imgArr[index]) {
            item.url = that.data.imgArr[index].url;
          }
        });
        that.setData({
          flag: true,
          url: that.data.imageArray[
            Math.floor(Math.random() * that.data.imageArray.length)
          ].url,
          list: result.res.options
        });
      }
      chat.scrollToNew();
    }
  },
  methods: {
    choose: function (e) {
      const chat = plugin.getChatComponent();
      chat.send(e.currentTarget.dataset.title);
    },
    getFacePosition(index) {
      const row = 15;
      const width = 24;
      const height = 24;

      const y = Math.floor(index / row);
      const x = index - y * row;
      return -(x * width) + "px " + -(y * height) + "px";
    }
  }
});