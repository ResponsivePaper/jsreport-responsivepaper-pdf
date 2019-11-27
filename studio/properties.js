import React, { Component } from 'react'

export default class Properties extends Component {
  render() {
    const { entity, onChange } = this.props
    const responsivepaperPdf = entity.responsivepaperPdf || {}
    const change = (change) => onChange(Object.assign({}, entity, { responsivepaperPdf: Object.assign({}, entity.responsivepaperPdf, change) }))

    return (

      <div className='properties-section'>
        <div className='form-group'>
          <label title='window.RESPONSIVE_PAPER_READY_TO_RENDER=true;'>wait for render trigger</label>
          <input
            type='checkbox' title='window.RESPONSIVE_PAPER_READY_TO_RENDER=true;' checked={responsivepaperPdf.waitForReadyToRender === true}
            onChange={(v) => change({ waitForReadyToRender: v.target.checked })} />
        </div>
        <div className='form-group'>
          <label title='disable virtual browser cache'>disable cache</label>
          <input
            type='checkbox' title='disable virtual browser cache' checked={responsivepaperPdf.disableCache === true}
            onChange={(v) => change({ disableCache: v.target.checked })} />
        </div>
        <div className='form-group'>
          <label title='include logs (always true for free accounts)'>include logs</label>
          <input
            type='checkbox' title='include logs (always true for free accounts)' checked={responsivepaperPdf.includeConsole === true}
            onChange={(v) => change({ includeConsole: v.target.checked })} />
        </div>
        <div className='form-group'><label>format</label>
          <input
            title='letter, legal, ledger, A4, A5, A6' type='string'
            value={responsivepaperPdf.format}
            onChange={(v) => change({ format: v.target.value })} />
        </div>
        <div className='form-group'>
          <label title='landscape'>landscape</label>
          <input
            type='checkbox' title='landscape' checked={responsivepaperPdf.landscape === true}
            onChange={(v) => change({ landscape: v.target.checked })} />
        </div>
        <div className='form-group'>
          <label title='print media'>print media</label>
          <input
            type='checkbox' title='print media' checked={responsivepaperPdf.printMedia === true}
            onChange={(v) => change({ printMedia: v.target.checked })} />
        </div>
        <div className='form-group'><label>timeout</label>
          <input
            title='timeout' type='number' placeholder='5000' min='0' max='40000'
            value={responsivepaperPdf.timeout}
            onChange={(v) => change({ timeout: v.target.value })} />
        </div>
      </div>
    )
  }
}