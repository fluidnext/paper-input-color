import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';

class PaperInputColor extends PolymerElement {
    static get template(){
        return html`
            <style>
                #inputColor{
                    /*display: flex;
                    align-self: center;
                    width: var(--paper-input-color-width-wrapper, 160px);
                    height: var(--paper-input-color-height-wrapper, 50px);
                    */
                    width: var(--paper-input-color-width-wrapper, 160px);
                    text-align: center;
                }
                #colorPreview{
                    width: 350%;
                    height: 20px;
                    border: 3px solid #000;
                    border-radius: 50px;
                    margin-right: 10%;
                }

                #clear {
                    display: none;
                }
            </style>
            <paper-input id="inputColor" readonly="true" on-click="_onClick" value="{{value}}">
                <div slot="prefix" prefix id="colorPreview"></div>
                <paper-icon-button slot="suffix" suffix id="clear" icon="icons:clear" on-click="_clear"></paper-icon-button>
            </paper-input>
            <input id="inputColorHidden" type="color" value="{{value}}">
        `
    }

    static get properties(){
        return {
            /**
             * `value` of hidden input
             */
            value: {
                type: String,
                value: null,
                observer: `_changeValue`
            },
            paperValue: {
                type: String,
                value: '',
                notify: true
            }
        }
    }

    ready() {
        super.ready();
    }

    _clear(){
        console.warn('clear');
    }

    _onClick(){
        this.$.inputColorHidden.click();
    }

    _changeValue(newValue, old){
        console.warn(newValue);
        console.warn(old);
    }
}

window.customElements.define('paper-input-color', PaperInputColor);