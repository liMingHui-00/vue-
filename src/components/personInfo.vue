<template>
  <div class="container">
    <div class="container-top">
      <div class="profile">
        <img
          class="profile-image"
          src="https://placehold.co/64"
          alt="Profile image placeholder"
        />
        <div class="user-info">
          <h2 class="username">用户名</h2>
          <p class="user-description">用户简介或其他信息</p>
        </div>
      </div>
      <div class="stats">
        <span class="followers"
          >关注者 <br />
          &nbsp;&nbsp;&nbsp; 0</span
        >
        <span class="following"
          >关注 <br />
          &nbsp;&nbsp;0</span
        >
      </div>
    </div>
    <div class="navigation">收藏 点赞</div>
    <div class="comments">
      <div class="comment">
        <img
          class="comment-image"
          src="https://placehold.co/48"
          alt="Commenter image placeholder"
        />
        <div class="comment-content">
          <h3 class="comment-username">评论用户名</h3>
          <p class="comment-text">这里是评论内容。</p>
          <span class="like-count">👍 9</span>
        </div>
      </div>
      <!-- Repeat for each comment -->
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  border: 1px solid #000;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  .container-top {
    width: 1230px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .profile {
      display: flex;
      align-items: center;
      .profile-image {
        border-radius: 9999px;
        border: 1px solid #d1d5db;
        margin-right: 1rem;
      }
      .user-info {
        .username {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .user-description {
          color: #6b7280;
        }
      }
    }
    .stats {
      border: 1px solid #000;
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      width: 410px;
      .followers,
      .following {
        color: #4b5563;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
  .comments {
    .comment {
      display: flex;
      align-items: start;
      margin-top: 1rem;
      .comment-image {
        border-radius: 9999px;
        border: 1px solid #d1d5db;
        margin-right: 1rem;
      }
      .comment-content {
        .comment-username {
          font-size: 1rem;
          font-weight: 600;
        }
        .comment-text {
          color: #6b7280;
          margin-top: 0.25rem;
        }
        .like-count {
          display: inline-block;
          color: #10b981;
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>
