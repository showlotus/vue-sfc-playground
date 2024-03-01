export const ElementPlusPlugin = {
  pluginName: 'element-plus-plugin.ts',
  initFcName: 'initElementPlusPlugin',
  import() {
    return {
      'element-plus':
        'https://cdn.jsdelivr.net/npm/element-plus@2.5.6/dist/index.full.min.mjs',
    }
  },
  genImport() {
    return `import { ${this.initFcName} } from './${this.pluginName}'\n${this.initFcName}()\n`
  },
  genContent() {
    return `
import { getCurrentInstance } from 'vue'
import ElementPlus from 'element-plus'

export function ${this.initFcName}() {
  const instance = getCurrentInstance()
  instance.appContext.app.use(ElementPlus)
}

export function appendStyle() {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/element-plus@2.5.6/dist/index.min.css'
    link.onload = resolve
    link.onerror = reject
    document.body.appendChild(link)
  })
}

await appendStyle()
        `.trim()
  },
  use() {
    return {
      [this.pluginName]: this.genContent(),
    }
  },
}
