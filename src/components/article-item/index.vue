<template>
    <van-cell class="article-item" :to="/article/+ this.article.art_id">
      <div slot="title" class="title">{{article.title}}</div>
      <div slot="label">
        <div class="cover-warp" v-if="article.cover.type === 3">
          <div class="cover-item" v-for="(img, i) in article.cover.images" :key="i">
            <van-image
              class="cover-img"
              fit="cover"
              :src="img"
            />
          </div>
        </div>
        <div class="lable-info-warp">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate | formateDate}}</span>
        </div>
      </div>
      <van-image
        v-if="article.cover.type === 1"
        slot="default"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {

  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {

  },
  watch: {

  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    padding-left: 25px;
    flex: unset;
    width: 232px;
    height: 146px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .lable-info-warp {
    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }
  .cover-warp {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
