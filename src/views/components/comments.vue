<template>
  <div class="comment-section-container">
    <div class="comment-card">
      <div class="comment-card-header">
        <!-- <span class="header-title">评论 {{ commentTatol.msg }}</span> -->
        <span class="header-title">评论 {{ comments }}</span>
        <postComments @comment-submit="handleCommentSumit"></postComments>
      </div>

      <!-- <div class="comment-list"> -->
      <!-- Comment item -->
      <!-- <div class="comment-item" v-for="comment in commentTatol.msg" :key="comment.id"> -->
      <!-- <div class="comment-item-layout"> -->
      <!-- <div class="comment-avatar"> -->
      <!-- 头像 -->
      <!-- <img :src="generateRandomAvatar()" alt="" /> -->
      <!-- </div> -->
      <!-- <div class="comment-details"> -->
      <!-- <div class="comment-author-and-content"> -->
      <!-- <span class="comment-author">{{ generateRandomChineseName() }}：</span> -->
      <!-- <span>{{ generateRandomComment() }}</span> -->
      <!-- </div> -->
      <!-- <div class="comment-date">回复 · {{ generateCommentTime() }}</div> -->
      <!-- </div> -->
      <!-- <div class="comment-interactions"> -->
      <!-- 点赞数 -->
      <!-- <button class="comment-interactions-btn" ref="likeNum" @click.once="likeNumUp(comment)"> -->
      <!-- {{ generateRandomInter() }} 👍 -->
      <!-- </button> -->
      <!-- </div> -->
      <!-- </div> -->
      <!-- </div> -->
      <!-- <div class="view-all-comments"> -->
      <!-- 查看全部 {{ commentTatol.msg }} 条评论 -->
      <!-- </div> -->
      <!-- </div> -->
      <div class="comment-list">
        <!-- Comment item -->
        <div class="comment-item" v-for="comment in commentsArr" :key="comment.comment_id">
          <div class="comment-item-layout">
            <div class="comment-avatar">
              <!-- 头像 -->
              <img class="userAvatar" :src="generateRandomAvatar()" alt="" />
            </div>
            <div class="comment-details">
              <div class="comment-author-and-content">
                <span class="comment-author">{{ generateRandomChineseName() }}：</span>
                <span>{{ comment.comment_text }}</span>
              </div>
              <div class="comment-date">回复 · {{ moment(comment.posted_datetime).local().format('YYYY-MM-DD HH:mm:ss') }}
              </div>
            </div>
            <div class="comment-interactions">
              <!-- 点赞数 -->
              <button class="comment-interactions-btn" ref="likeNum" @click.once="likeNumUp(comment)">
                {{ comment.thumbs_up_count }} 👍
              </button>
            </div>
          </div>
        </div>
        <div class="view-all-comments">
          查看全部 {{ comments }} 条评论
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 时间
import generateLimitedTimeData from "@/mock/data.js"
import moment from "moment"
import postComments from "@/components/postComments.vue"
const generateCommentTime = () => {
  return generateLimitedTimeData()
}
// 名字
import { generateRandomChineseName } from "@/mock/name.js"
// 评论
// import { generateRandomComment } from "@/mock/comment.js"
// 点赞
import { generateRandomInter } from "@/mock/likeNum.js"
import { useThumbcountService } from "@/api/comments"
// 头像
import { generateRandomAvatar } from "@/mock/avatar.js"
import { useAddcommentService } from '@/api/comments'

import { ref, onMounted, toRefs } from "vue"
import { useGetCommentsService } from '@/api/comments'

let commentTatol = defineProps(["msg"])
const handleCommentSumit = async (commentData) => {
  console.log(commentData)
  await useAddcommentService({ commentData })
  function likeNumUp(commentData) {
    useThumbcountService()
  }
}
// 评论总数
const comments = ref(null)
// 评论列表
const commentsArr = ref(null)
// 获取点赞的数量
const likeNum = ref(null)
// 点击增加点赞数
const likeNumUp = async (comment) => {
  const button = document.querySelectorAll(".comment-interactions-btn")
  comment.thumbs_up_count += 1
  button.innerHTML = `<span style="color: red;">${comment.thumbs_up_count} 👍</span>`
}
onMounted(async () => {
  const { data: { data } } = await useGetCommentsService()
  comments.value = data.length
  commentsArr.value = [...data]
})
</script>

<style scoped>
.comment-section-container {
  max-width: 640px;
  /* Tailwind class: max-w-2xl */
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.25rem;
  /* Tailwind class: pt-5 */
}

.comment-card {
  background-color: #ffffff;
  /* Tailwind class: bg-white */
  padding: 1rem;
  /* Tailwind class: p-4 */
  border-radius: 0.5rem;
  /* Tailwind class: rounded */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  /* Tailwind class: shadow */
}

.comment-card-header {
  border-bottom: 1px solid #d1d5db;
  /* Tailwind class: border-b */
  padding-bottom: 0.5rem;
  /* Tailwind class: pb-2 */
}

.header-title {
  font-size: 1.125rem;
  /* Tailwind class: text-lg */
  font-weight: 700;
  /* Tailwind class: font-bold */
}

.comment-list {
  margin-top: 1rem;
  /* Tailwind class: mt-4 */
}

.comment-item {
  background-color: #f2f2f2;
  /* Tailwind class: bg-gray-200 */
  border-radius: 0.375rem;
  /* Tailwind class: rounded-md */
  margin-bottom: 0.5rem;
  /* Tailwind class: mb-2 */
  padding: 0.5rem;
  /* Tailwind class: p-2 */
}

.comment-item-layout {
  display: flex;
  align-items: start;
}

.comment-avatar {
  border: 1px solid #000;
  width: 2.5rem;
  /* Tailwind class: w-10 */
  height: 2.5rem;
  /* Tailwind class: h-10 */
  background-color: #d1d5db;
  /* Tailwind class: bg-gray-300 */
  margin-right: 0.75rem;
  /* Tailwind class: mr-3 */
}

.userAvatar {
  width: 40px;
  height: 40px;
}

.comment-details {
  flex: 1;
}

.comment-author-and-content {
  font-size: 0.875rem;
  /* Tailwind class: text-sm */
}

.comment-author {
  font-weight: 500;
  /* Tailwind class: font-medium */
}

.comment-date {
  color: #6b7280;
  /* Tailwind class: text-gray-500 */
  font-size: 0.75rem;
  /* Tailwind class: text-xs */
}

.comment-interactions {
  color: #6b7280;
  /* Tailwind class: text-gray-400 */
  font-size: 0.875rem;
  /* Tailwind class: text-sm */
}

.comment-interactions-btn {
  border: none;
}

.view-all-comments {
  text-align: center;
  color: #6b7280;
  /* Tailwind class: text-gray-500 */
  font-size: 0.875rem;
  /* Tailwind class: text-sm */
  padding: 0.5rem;
  /* Tailwind class: py-2 */
}
</style>
