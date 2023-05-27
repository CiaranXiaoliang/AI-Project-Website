let contentImage, styleImage;

// 当页面加载完成时执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取元素
    contentImage = document.getElementById('content-image');
    styleImage = document.getElementById('style-image');
    const transferButton = document.getElementById('transfer-button');
    const resultContainer = document.getElementById('result');

    // 监听按钮点击事件
    transferButton.addEventListener('click', () => {
        // 确保选择了内容图像和风格图像
        if (!contentImage.files[0] || !styleImage.files[0]) {
            alert('Please select both content and style images.');
            return;
        }

        // 执行图像风格迁移
        performStyleTransfer(contentImage.files[0], styleImage.files[0], resultContainer);
    });
});

// 执行图像风格迁移
async function performStyleTransfer(contentFile, styleFile, resultContainer) {
    try {
        // 加载图像风格迁移模型
        const styleTransferModel = await styleTransfer.load();

        // 读取内容图像和风格图像
        const content = await loadImage(contentFile);
        const style = await loadImage(styleFile);

        // 对图像进行风格迁移
        const stylized = await styleTransferModel.transfer(content, style);

        // 在页面上显示结果图像
        resultContainer.innerHTML = '';
        const stylizedImage = createImageElement(stylized);
        resultContainer.appendChild(stylizedImage);
    } catch (error) {
        console.error('An error occurred during style transfer: ', error);
    }
}

// 加载图像文件
function loadImage(file) {
    return new Promise((resolve
