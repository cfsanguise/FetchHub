document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category')
    const headerImage = document.querySelector('.image-input')
    const headerImageFileInput = document.querySelector('#header-image')
    const addTagBtn = document.querySelector('#add-new-tag')
    const tagsInput = document.querySelector('#tags')

    categories.forEach(category => {
        category.addEventListener('click', () => {
            categories.forEach(item => item.classList.remove('selected'))
            category.classList.add('selected')
            document.querySelector(`.categories input[value=${category.getAttribute('data-filetype')}]`).checked = true
        })
    })

    headerImage.addEventListener('click', () => {
        headerImageFileInput.click()
    })

    headerImageFileInput.addEventListener('change', e => {
        console.log(e.target.files)
        readImage(e.target.files[0])
        headerImage.classList.add('selected')
    })

    let tags = []
    addTagBtn.addEventListener('click', () => {
        const newTag = document.createElement('div')
        newTag.classList.add('tag')
        newTag.setAttribute('contenteditable', true)
        newTag.setAttribute('tabindex', 0)
        newTag.textContent = 'new'
        addTagBtn.parentNode.insertBefore(newTag, addTagBtn)
        newTag.addEventListener('submit', e => console.log('jee'))
    })

    const readImage = file => {
        if (file.type && !file.type.startsWith('image/')) {
          alert('File is not an image.', file.type, file);
          return;
        }
      
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          headerImage.style.background = `url('${event.target.result}') center center/cover no-repeat`;
        });
        reader.readAsDataURL(file);
    }

})