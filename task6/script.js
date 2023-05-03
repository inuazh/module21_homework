const form = document.querySelector('form');
const pageInput = document.getElementById('page-input');
const limitInput = document.getElementById('limit-input');
const submitButton = document.getElementById('submit-button');

// При нажатии на кнопку отправляем запрос
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const page = parseInt(pageInput.value);
    const limit = parseInt(limitInput.value);

    // Проверяем, что введенные значения находятся в диапазоне от 1 до 10
    if (isNaN(page) || page < 1 || page > 10) {
        console.log('Номер страницы вне диапазона от 1 до 10');
        return;
    }

    if (isNaN(limit) || limit < 1 || limit > 10) {
        console.log('Лимит вне диапазона от 1 до 10');
        return;
    }

    // Создаем URL для запроса и выполняем его
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    console.log(`Выполняем запрос: ${url}`);
    // здесь нужно выполнить запрос и обработать результаты

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Сохраняем данные в localStorage
            localStorage.setItem('images', JSON.stringify(data));
            // Выводим картинки на экран
            displayImages(data);
        })
        .catch(error => console.error(error));

    function displayImages(images) {
        const imagesContainer = document.createElement('div');
        imagesContainer.classList.add('images-container');

        images.forEach((image) => {
            const img = document.createElement('img');
            img.src = image.download_url;
            img.alt = image.author;
            img.classList.add('image');
            imagesContainer.appendChild(img);
        });

        document.body.appendChild(imagesContainer);
    }

    // Получаем сохраненные данные из localStorage
    const savedData = localStorage.getItem('images');

    // Если данные есть, выводим их на экран
    if (savedData) {
        displayImages(JSON.parse(savedData));
    }


});


