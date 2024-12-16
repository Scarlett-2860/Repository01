document.addEventListener('DOMContentLoaded', function() {
    const imageItems = document.querySelectorAll('.image-item');
    const imageSection = document.querySelector('.image-section');
    const sectionWidth = imageSection.clientWidth;
    const sectionHeight = imageSection.clientHeight;
    const padding = 60; // 内边距，避免图片贴边
    const spacing = 200; // 图片之间的最小间距
    const positions = []; // 用于存储已放置图片的位置和尺寸
    const minSpacing = 10000; // 图片之间的最小间距，单位：像素
imageItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const title = item.querySelector('.image-title');

    // 确保图片加载完毕后获取其原始尺寸
    img.onload = () => {
        const imgWidth = img.naturalWidth * 0.2; // 缩小 50%
        const imgHeight = img.naturalHeight * 0.2;

        // 设置图片尺寸，保持比例
        img.style.width = `${imgWidth}px`;
        img.style.height = 'auto';
        // 计算容器尺寸，包含图片和标题
        const itemWidth = imgWidth;
        const itemHeight = imgHeight + title.offsetHeight + 20; // 图片高度 + 标题高度 + 间距

        let randomX, randomY;
        let attempts = 0;
        const maxAttempts = 10; // 最大尝试次数，避免无限循环

        // 确保图片不重叠且不超出边界
        do {
            randomX = Math.random() * (sectionWidth - itemWidth - padding * 0.2) + padding;
            randomY = Math.random() * (sectionHeight - itemHeight - padding * 0.2) + padding;
            attempts++;
        } while (
            isOverlapping(randomX, randomY, itemWidth, itemHeight) &&
            attempts < maxAttempts
        );

        // 如果超过尝试次数，直接放置（可能会有重叠）
        if (attempts >= maxAttempts) {
            console.warn('无法避免重叠，直接放置图片');
        }

        // 设置容器位置
        item.style.left = `${randomX}px`;
        item.style.top = `${randomY}px`;

        // 保存当前图片位置
        positions.push({ x: randomX, y: randomY, width: itemWidth, height: itemHeight });
    };

    // 如果图片已加载，直接调用 onload
    if (img.complete) {
        img.onload();
    }
});

// 检查是否与已放置图片重叠
function isOverlapping(x, y, width, height) {
    return positions.some(pos => {
        return !(
            x + width + minSpacing < pos.x || // 在已放置图片的左侧
            x > pos.x + pos.width + minSpacing || // 在已放置图片的右侧
            y + height + minSpacing < pos.y || // 在已放置图片的上方
            y > pos.y + pos.height + minSpacing // 在已放置图片的下方
        );
    });
}
});
function isOverlapping(x, y, width, height) {
    return positions.some(pos => {
        return !(
            x + width + minSpacing < pos.x || // 在已放置图片的左侧
            x > pos.x + pos.width + minSpacing || // 在已放置图片的右侧
            y + height + minSpacing < pos.y || // 在已放置图片的上方
            y > pos.y + pos.height + minSpacing // 在已放置图片的下方
        );
    });
}

