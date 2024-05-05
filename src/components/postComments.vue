<template>
  <div class="comment-section">
    <div class="new-comment">
      <textarea class="new-comment-textarea" placeholder="请输入评论内容" v-model="newComment" rows="4"></textarea>
      <button class="submit-btn" @click="submitComment">提交评论</button>
    </div>
    <div class="comments">
      <div class="comment-box" v-for="(comment, index) in comments" :key="index" :class="`color-${comment.color}`">
        <img class="avatar" :src="userAvatar" />
        <!-- 评论内容 -->
        <p class="comment-main">{{ comment.text }}</p>
        <button class="like-btn" @click.once="likeComment(index)">
          <!-- 点赞数 -->
          <span class="like-btn-num">{{ comment.likes }}</span> &nbsp; 👍
        </button>
        <div class="comment-footer">
          <!-- 时间 -->
          <span>{{ comment.timestamp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserInfoService } from "@/api/user"
import { ref, onMounted } from "vue"
const userAvatar = ref(null)

const newComment = ref("")
const comments = ref([])
// 定义emit
const emit = defineEmits(["comment-submit"])
const submitComment = () => {
  if (newComment.value.trim() !== "") {
    const commentData = {
      text: newComment.value,
      timestamp: new Date().toLocaleString(),
      likes: 0,
    }
    comments.value.push(commentData)
    emit("comment-submit", commentData)
    // 提交后清空评论区
    newComment.value = ""
  }
}

const likeComment = (index) => {
  comments.value[index].likes++
  const button = document.querySelector(".like-btn-num")
  button.style.color = "red"
}
onMounted(async () => {
  const userInfo = await useUserInfoService()
  userAvatar.value = userInfo.data.data[0].avatar
})
</script>

<style scoped lang="scss">
.comment-section {
  .new-comment {
    margin-bottom: 1rem;

    .new-comment-textarea {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
    }

    .submit-btn {
      padding: 0.5rem 1rem;
      background-color: #1c7293;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: darken(#1c7293, 10%);
      }
    }
  }

  .comments {
    .comment-box {
      border: 1px solid #000;
      height: 70px;
      margin-bottom: 1rem;
      border-radius: 4px;
      background-color: rgb(242, 242, 242);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      .comment-main {
        position: absolute;
        top: 0;
        left: 70px;
      }

      .avatar {
        width: 40px;
        height: 40px;
      }

      .comment-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 40px;
        left: 70px;
        color: rgb(107, 114, 128);

        ::before {
          content: "回复：";
          color: rgb(107, 114, 128);
        }
      }
    }
  }
}

.like-btn {
  position: absolute;
  top: 15px;
  left: 555px;
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
