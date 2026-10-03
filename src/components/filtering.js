//7sprint//import { createComparison, defaultRules, rules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
//7sprint//const compare = createComparison(defaultRules);
/*export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes) // Получаем ключи из объекта
        .forEach((elementName) => {
            // Перебираем по именам
            const listTemplate =
                elements[elementName].firstElementChild.cloneNode(true); // в качестве шаблона берём первый элемент из контейнера со страницами
            //elements[elementName].firstElementChild.remove();
            listTemplate.removeAttribute('selected');
            elements[elementName].append(
                // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
                    .map((name) => {
                        // используйте name как значение и текстовое содержимое
                        const el = listTemplate.cloneNode(true); // клонируем шаблон, который запомнили ранее
                        if (el.hasAttribute("value")) {
                            el.setAttribute("value", name);
                            el.textContent = name;
                        }
                        return el; // @todo: создать и вернуть тег опции
                    }),
            );
        });
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action)
            switch (action.name) {
                case "clear": {
                    action.parentElement.querySelector("input").value = "";
                    state[action.dataset.field] = "";
                }
            }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        state['total'] = [state.totalFrom, state.totalTo];

        return data.filter((row) => compare(row, state));
    };
}
*/

export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // код с обработкой очистки поля
        if (action)
            switch (action.name) {
                case "clear": {
                    action.parentElement.querySelector("input").value = "";
                    state[action.dataset.field] = "";
                }
            }
        // @todo: #4.5 — отфильтровать данные, используя компаратор
        state['total'] = [state.totalFrom, state.totalTo];

        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
}