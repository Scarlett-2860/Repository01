// 为每个图片项添加点击事件监听器
document.querySelectorAll('.image-item').forEach(item => {
    item.addEventListener('click', () => {
        // 获取图片的alt属性作为新的页面名称
        const pageName = item.querySelector('img').alt.replace(/ & /g, '-').replace(/ /g, '-').toLowerCase();
        // 构建新的页面URL
        const newPageUrl = `${pageName}.html`;
        // 跳转到新的页面
        window.location.href = newPageUrl;
    });
});
