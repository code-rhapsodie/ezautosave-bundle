(function () {
  const mode = location.href.match(/content\/create/) ? 'create' : 'edit'
  let storageKey
  let contentKey
  if (mode === 'create') {
    contentKey = location.href.match(/\/(nodraft|on-the-fly)\/([^\/]*)/)[2]
    storageKey = `crautosave-${contentKey}`
  } else {
    contentKey = location.href.match(/\/draft\/([^\/]*)/)[1]
    storageKey = `crautosave-${contentKey}`
  }

  // const publishButton = document.getElementById(`content_${mode}__sidebar_right__publish-tab`)
  // const saveButton = document.getElementById(`content_${mode}__sidebar_right__save_draft-tab`)
  // const cancelButton = document.getElementById(`content_${mode}__sidebar_right__cancel-tab`)
  // const closeButton = document.querySelector('.ez-content-edit-container__close')

  const textFields = document.querySelectorAll('.ez-field-edit--ezstring input, .ez-field-edit--eztext textarea')
  const dateFields = document.querySelectorAll('.ez-field-edit--ezdatetime')
  const richTextFields = document.querySelectorAll('.ez-field-edit--ezrichtext')

  textFields.forEach(function (e) {
    e.addEventListener("blur", function () {
      saveTextField(this)
    })
  })

  const saveTextField = function (field) {
    storeState(field.id, {type: 'value', value: field.value})
  }

  const saveDateField = function (field) {
    const inputs = field.querySelectorAll('input')
    const date = inputs[0]
    const source = inputs[1]
    storeState(source.id, {type: 'date', value: {
      date: date.value,
      source: source.value,
    }})
  }

  const saveRichTextField = function (field) {
    const source = field.querySelector('.ez-data-source__richtext')
    const textarea = field.querySelector('textarea')
    storeState(source.id, {type: 'innerHTML', value: source.innerHTML})
    storeState(textarea.id, {type: 'value', value: textarea.value})
  }

  const storeState = function (key, value) {
    const state = loadState()
    state[key] = value
    localStorage.setItem(storageKey, JSON.stringify(state))
  }

  const loadState = function () {
    const stored = localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored) : {}
  }

  // const clearStorage = function () {
  //   localStorage.removeItem(storageKey)
  // }

  const restore = function () {
    if (!localStorage.getItem(storageKey)) {
      return
    }

    if (!confirm('Temporary fields values were found in your browser local storage. Do you want to fill fields with these values?')) {
      return
    }

    const state = loadState()
    Object.entries(state).forEach(function (itemState) {
      const id = itemState[0]
      const value = itemState[1]
      switch (value.type) {
        case 'value':
          document.getElementById(id).value = value.value
          break
        case 'innerHTML':
          document.getElementById(id).innerHTML = value.value
          break
        case 'date':
          const source = document.getElementById(id)
          const date = source.parentElement.querySelector('input')
          date.value = value.value.date
          source.value = value.value.source
          break
      }
    })
  }

  // publishButton.addEventListener('click', clearStorage)
  // saveButton.addEventListener('click', clearStorage)
  // cancelButton.addEventListener('click', clearStorage)
  // closeButton.addEventListener('click', clearStorage)

  setInterval(function () {
    textFields.forEach(function (e) {
      saveTextField(e)
    })
    richTextFields.forEach(function (e) {
      saveRichTextField(e)
    })
    dateFields.forEach(function (e) {
      saveDateField(e)
    })
  }, 5000)

  setTimeout(restore, 1000)
})()
