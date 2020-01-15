export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/**
 * Создание элемента разметки
 * @param {String} template - Разметка в виде строки
 * @return {HTMLElement} - Элемент разметки
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Рендеринг элемента разментки
 * @param {HTMLElement} container - Элемент разметки, куда добавляется новый элемент
 * @param {HTMLElement} component - Новый элемент, добавляемый в DOM-дерево
 * @param {DOMString} place - Определяет позицию добавляемого элемента относительно элемента, вызвавшего метод
 */
export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component);
      break;
    case RenderPosition.BEFOREEND:
      container.append(component);
      break;
    case RenderPosition.AFTEREND:
      container.after(component);
      break;
  }
};

/**
 * Удаление элемента разментки
 * @param {HTMLElement} component - Новый элемент, добавляемый в DOM-дерево
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

/**
 * Замена старого элемента разментки новый
 * @param {HTMLElement} newComponent - Новый элемент на который будет заменен oldComponent
 * @param {HTMLElement} oldComponent - Элемент который будет заменен.
 */
export const replace = (newComponent, oldComponent) => {
  if (!newComponent) {
    throw new Error(`Please, send new component as argument`);

  } else if (!oldComponent) {
    throw new Error(`Please, send old component as argument`);

  } else {
    const newElement = newComponent.getElement();
    const oldElement = oldComponent.getElement();
    const parentElement = oldElement.parentElement;

    if (parentElement) {
      parentElement.replaceChild(newElement, oldElement);
    }
  }
};
