import Properties from './Properties.js'
import Studio from 'jsreport-studio'

Studio.addPropertiesComponent('responsivepaper pdf', Properties, (entity) => entity.__entitySet === 'templates' && entity.recipe === 'responsivepaper-pdf')