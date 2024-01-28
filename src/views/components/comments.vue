<template>
  <div class="comment-section-container">
    <div class="comment-card">
      <div class="comment-card-header">
        <span class="header-title">评论 25</span>
      </div>
      <div class="comment-list">
        <!-- Comment item -->
        <div class="comment-item" v-for="comment in comments" :key="comment.id">
          <div class="comment-item-layout">
            <div class="comment-avatar"></div>
            <div class="comment-details">
              <div class="comment-author-and-content">
                <span class="comment-author">{{ comment.author }}</span>
                <span>{{ comment.content }}</span>
              </div>
              <div class="comment-date">回复 · {{ comment.date }}</div>
            </div>
            <div class="comment-interactions">
              {{ comment.interactions }} 位
            </div>
          </div>
        </div>
        <div class="view-all-comments">查看全部 25 条评论</div>
      </div>
    </div>
  </div>
</template>

<script setup>
let comments = defineProps(["msg"])
console.log(comments)
// let comments = ref(["1", 2, 3, 4, 5, 6, 7])
</script>

<style scoped>
.comment-section-container {
  max-width: 640px; /* Tailwind class: max-w-2xl */
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.25rem; /* Tailwind class: pt-5 */
}

.comment-card {
  background-color: #ffffff; /* Tailwind class: bg-white */
  padding: 1rem; /* Tailwind class: p-4 */
  border-radius: 0.5rem; /* Tailwind class: rounded */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* Tailwind class: shadow */
}

.comment-card-header {
  border-bottom: 1px solid #d1d5db; /* Tailwind class: border-b */
  padding-bottom: 0.5rem; /* Tailwind class: pb-2 */
}

.header-title {
  font-size: 1.125rem; /* Tailwind class: text-lg */
  font-weight: 700; /* Tailwind class: font-bold */
}

.comment-list {
  margin-top: 1rem; /* Tailwind class: mt-4 */
}

.comment-item {
  background-color: #f2f2f2; /* Tailwind class: bg-gray-200 */
  border-radius: 0.375rem; /* Tailwind class: rounded-md */
  margin-bottom: 0.5rem; /* Tailwind class: mb-2 */
  padding: 0.5rem; /* Tailwind class: p-2 */
}

.comment-item-layout {
  display: flex;
  align-items: start;
}

.comment-avatar {
  width: 2.5rem; /* Tailwind class: w-10 */
  height: 2.5rem; /* Tailwind class: h-10 */
  background-color: #d1d5db; /* Tailwind class: bg-gray-300 */
  margin-right: 0.75rem; /* Tailwind class: mr-3 */
}

.comment-details {
  flex: 1;
}

.comment-author-and-content {
  font-size: 0.875rem; /* Tailwind class: text-sm */
}

.comment-author {
  font-weight: 500; /* Tailwind class: font-medium */
}

.comment-date {
  color: #6b7280; /* Tailwind class: text-gray-500 */
  font-size: 0.75rem; /* Tailwind class: text-xs */
}

.comment-interactions {
  color: #6b7280; /* Tailwind class: text-gray-400 */
  font-size: 0.875rem; /* Tailwind class: text-sm */
}

.view-all-comments {
  text-align: center;
  color: #6b7280; /* Tailwind class: text-gray-500 */
  font-size: 0.875rem; /* Tailwind class: text-sm */
  padding: 0.5rem; /* Tailwind class: py-2 */
}
</style>
