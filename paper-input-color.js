import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';

class PaperInputColor extends PolymerElement {
    static get template(){
        return html`
            <style>
                #inputColor{
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

                .hide-button {
                    display: none;
                }
            </style>
            <paper-input id="inputColor" readonly="true" on-click="_onClick" value="{{stringColor}}">
                <div slot="prefix" prefix style$="background-color: [[stringColor]]" id="colorPreview"></div>
                <paper-icon-button id="clearButton" slot="suffix" suffix class="hide-button" icon="icons:clear" on-click="_clear"></paper-icon-button>
            </paper-input>
            <input hidden id="inputColorHidden" type="color" on-change="_onChange">
        `
    }

    static get properties(){
        return {
            /**
             * `value` value of paper-input-color
             */
            _value: {
                type: Object,
                value: {}
            },
            /**
             * `stringColor` string with the value of hidden input type color
             */
            stringColor: {
                type: String,
                value: undefined,
                notify: true,
                observer: `_changeColor`
            },
            /**
             * `paperValue` string value of the paper-input for value property
             */
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

    /**
     * Used for set string color at `null` to show transparent color
     */
    _clear(event){
        console.warn(event);
        this.stringColor = null;
    }
    
    /**
     * Used to bind click from paper-input to hidden input
     */
    _onClick(){
        this.$.inputColorHidden.click();
    }

    /**
     * 
     * @param {string} color
     * Function to convert Hex value in rgb 
     */
    _convertColor(color) {
        /* Check for # infront of the value, if it's there, strip it */

        if (color.substring(0, 1) == '#') {
            color = color.substring(1);
        }

        let rgbColor = {};

        /* Grab each pair (channel) of hex values and parse them to ints using hexadecimal decoding */
        rgbColor.rChannel = parseInt(color.substring(0, 2), 16);
        rgbColor.gChannel = parseInt(color.substring(2, 4), 16);
        rgbColor.bChannel = parseInt(color.substring(4), 16);

        return rgbColor;
    }

    _onChange(value){
        this.stringColor = value.currentTarget.value;
        this._value = {
            hex: this.stringColor,
            rgb: this._convertColor(this.stringColor)
        }
        console.warn(this._value);
    }

    _showClearButton(){
        this.$.clearButton.classList.remove('hide-button');
    }
    
    _hideClearButton(){
        this.$.clearButton.classList.add('hide-button');
    }

    _changeColor(oldValue, newValue){
        if (typeof newValue === `string`) {
            this._showClearButton();
            return;
        }
        this._hideClearButton();
    }

    /**
     * `_value` is private, for a correct use using getter function from outside 
     */
    getPaperInputColorValue(){
        return this._value;
    }
}

window.customElements.define('paper-input-color', PaperInputColor);