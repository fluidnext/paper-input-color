import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior';
// TODO REMOVE
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-input-container';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-input/iron-input';
import '@polymer/paper-input/paper-input-error';

class PaperInputColor extends mixinBehaviors([PaperInputBehavior, IronFormElementBehavior], PolymerElement) {
    static get template(){
        return html`
            <style>
                iron-input > input {
                    @apply --paper-input-container-shared-input-style;
                    font-family: inherit;
                    font-weight: inherit;
                    font-size: inherit;
                    letter-spacing: inherit;
                    word-spacing: inherit;
                    line-height: inherit;
                    text-shadow: inherit;
                    color: inherit;
                    cursor: inherit;
                }

                input:disabled {
                    @apply --paper-input-container-input-disabled;
                }

                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    @apply --paper-input-container-input-webkit-spinner;
                }

                input::-webkit-clear-button {
                    @apply --paper-input-container-input-webkit-clear;
                }

                input::-webkit-calendar-picker-indicator {
                    @apply --paper-input-container-input-webkit-calendar-picker-indicator;
                }

                input::-webkit-input-placeholder {
                    color: var(--paper-input-container-color, var(--secondary-text-color));
                }

                input:-moz-placeholder {
                    color: var(--paper-input-container-color, var(--secondary-text-color));
                }

                input::-moz-placeholder {
                    color: var(--paper-input-container-color, var(--secondary-text-color));
                }

                input::-ms-clear {
                    @apply --paper-input-container-ms-clear;
                }

                input::-ms-reveal {
                    @apply --paper-input-container-ms-reveal;
                }

                input:-ms-input-placeholder {
                    color: var(--paper-input-container-color, var(--secondary-text-color));
                }
                
                [hidden] {
                    display: none;
                }
                
                paper-input-container {
                   --paper-input-prefix : {
                        width: 16px;
                        height: 16px;
                        border: 2px solid #000;
                        border-radius: 50px;
                        margin-right: 10px;
                        cursor: pointer;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-size: auto;
                   }
                }
            </style>

            <paper-input-container>
                <div id="colorPreview"  slot="prefix" prefix on-click="_onClick"></div>

                <label hidden$="[[!label]]" slot="label" aria-hidden="true">[[label]]</label>
                
                <iron-input bind-value="{{value}}" invalid="{{invalid}}" slot="input" disabled>
                    <input type="text" disabled>
                </iron-input>
                <input hidden id="inputColorHidden" type="color" on-input="_onChangeInputColorValue">  
                
                <iron-icon id="clearButton" slot="suffix" suffix class="hide-element" icon="icons:clear" on-click="_clear"></iron-icon>
                <template is="dom-if" if="[[errorMessage]]">
                    <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
                </template>
            </paper-input-container>
        `
    }

    static get properties(){
        return {

            /**
             *  `colorType` Set what you see on the input value, default value is HEX for hexadecimal, so you see '#ffffff'.
             *  there are two possibility, HEX or RGB
             */
            colorType: {
                type: String,
                value: 'hex'
            },
            /**
             * `value` Value of the element, could be '#ffffff'(hex) or 'rgb(100,100,100)'(rgb)
             */
            value: {
                type: String,
                notify: true,
                value: null,
                observer: '_onChangeValue'
            },
            /**
             * `label` Text to display as the input label
             */
            label: {
                type: String
            },
            /**
             * `invalid` Value for the input text
             */
            invalid: {
                type: Boolean,
                value: false
            },
            /**
             * `disabled` Value for the input text
             */
            disabled:{
                type: Boolean,
                value: false
            },
            /**
             * `required` Value for the input text
             */
            required: {
                type: Boolean,
                value:false
            },
            /**
            * `title` Value for the input text
            */
            title: {
                type: String
            },
            /**
            * `name` Value for the input text
            */
            name: {
                type: String
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
        event.stopPropagation();
        this.value = null;
        this._hideElement();
    }

    /**
     * Used to bind click from paper-input to hidden input
     */
    _onClick(){
        this.$.inputColorHidden.click();
    }

    /**
     * @param newValue
     * @private
     */
    _onChangeValue(newValue){
        if (!newValue) {
            this._hideElement();
            return;
        }

        this._showElement();
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
        }else{
            return color;
        }
        return `rgb(${parseInt(color.substring(0, 2), 16)}, ${parseInt(color.substring(2, 4), 16)}, ${parseInt(color.substring(4), 16)})`;
    }

    /**
     *
     * @param {Event} evt
     */
    _onChangeInputColorValue(evt){
        this.value = this.colorType === 'hex' ? evt.target.value : this._convertColor(evt.target.value);
        this._showElement();
    }

    _showElement(){
        this.$.clearButton.removeAttribute('hidden');
        this.$.colorPreview.style.cssText = `background-color: ${this.value};`
    }

    _hideElement(){
        this.$.clearButton.setAttribute('hidden', null);
        this.$.colorPreview.style.cssText = `background-image: url('./img/transparency.png');`
    }
}

window.customElements.define('paper-input-color', PaperInputColor);
