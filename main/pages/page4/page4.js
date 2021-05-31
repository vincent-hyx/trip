// pages/page4/page4.js
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true
  },
  onLoad() {
    //wx.showLoading({
    // title: '加载中...',
    // mask: true
    // });

    this.loadArticles();

    //console.log(app.globalData);

  },
  onReady() {
    //wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  async loadArticles() {
    const db = wx.cloud.database({})
    const cloudData = await db.collection('inform_aggregation').get()
    const aggregation = cloudData.data
    //console.log(aggregation);

    this.setData({
      aggregationList: aggregation
    })

    //console.log(this.data);

    let list = [{}];
    var i = 0;
    aggregation.forEach(aggregationItem => {
      list[i] = {};
      list[i].name = aggregationItem.tag;
      list[i].id = i;
      list[i].nodes = aggregationItem.nodes;
      i++;
    });

    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  gotoViewNote: function (e) {
    // console.log(e.currentTarget.dataset);

    app.globalData.viewNode.title = e.currentTarget.dataset.title;
    app.globalData.viewNode.article = e.currentTarget.dataset.article;
    app.globalData.viewNode.iconPath = e.currentTarget.dataset.iconpath;
    app.globalData.viewNode.picture = e.currentTarget.dataset.imageurl;

    //console.log(app.globalData);

    wx.navigateTo({
      url: '../viewitem/viewitem'
    })

  },
})