<template>
  <div>个人中心模块</div>

  <div class="container">
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
      <button class="follow-button">关注</button>
    </div>
    <div class="stats">
      <span class="followers">关注者 0</span>
      <span class="following">关注 0</span>
    </div>
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
  max-width: 640px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    .follow-button {
      margin-left: auto;
      background-color: #3b82f6;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      &:hover {
        background-color: #2563eb;
      }
    }
  }
  .stats {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    .followers,
    .following {
      color: #4b5563;
      font-weight: 600;
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
