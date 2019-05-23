import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior';

import '@polymer/paper-input/paper-input-container';
import '@polymer/paper-icon-button/paper-icon-button';
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

                label {
                    pointer-events: none;
                    margin-left: 25px;
                    width: 95%;
                }

                iron-input{
                    margin-left: 25px;
                    width: 95%;
                }

                #colorPreview{
                    width: 350%;
                    height: 20px;
                    border: 3px solid #000;
                    border-radius: 50px;
                    margin-right: 10%;
                }

                #transparentPreview{
                    width: 350%;
                    height: 20px;
                    border: 3px solid #000;
                    border-radius: 50px;
                    margin-right: 10%;

                    background-image: url('./img/transparency.png');
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: auto;
                }

                #clearButton{
                    padding: 0;
                    height: 30px;
                }

                .hide-element {
                    display: none;
                }
            </style>

            <paper-input-container on-click="_onClick">
                <div slot="prefix" prefix style$="background-color: [[value]]" id="colorPreview" class="hide-element"></div>
                <div slot="prefix" prefix id="transparentPreview"></div>

                <label hidden$="[[!label]]" aria-hidden="true" slot="label">[[label]]</label>
                <iron-input bind-value="{{value}}" slot="input" class="input-element" allowed-pattern="[[allowedPattern]]" invalid="{{invalid}}">
                    <!-- list$="[[list]]" -->
                    <input type="text" readonly="true" aria-labelledby$="[[_ariaLabelledBy]]" aria-describedby$="[[_ariaDescribedBy]]" disabled$="[[disabled]]" title$="[[title]]" value$=[[value]] required$="[[required]]" inputmode$="[[inputmode]]" name$="[[name]]" autocapitalize$="[[autocapitalize]]" autocorrect$="[[autocorrect]]" tabindex$="[[tabIndex]]" autosave$="[[autosave]]" results$="[[results]]" accept$="[[accept]]">
                    <input hidden id="inputColorHidden" type="color" on-change="_onChange" value="#ffffff">
                </iron-input>
                
                <paper-icon-button id="clearButton" slot="suffix" suffix class="hide-element" icon="icons:clear" on-click="_clear"></paper-icon-button>
                <!-- <template is="dom-if" if="[[errorMessage]]">
                    <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
                </template> -->
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
                notify: true
            },
            /**
             * `label` Text to display as the input label
             */
            label: {
                type: String,
                value: 'Select Color'
            },
            /**
             * `invalid` Value for the input text
             */
            invalid: {
                type: Boolean
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
                type: Boolean
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
        event.stopPropagation()
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
     * 
     * @param {string} color
     * Function to convert Hex value in rgb 
     */
    _convertColor(color) {
        /* Check for # infront of the value, if it's there, strip it */

        if (color.substring(0, 1) == '#') {
            color = color.substring(1);
        }

        return `rgb(${parseInt(color.substring(0, 2), 16)}, ${parseInt(color.substring(2, 4), 16)}, ${parseInt(color.substring(4), 16)})`;
    }

    _onChange(value){
        if (this.value === null) {
            return;
        }
        this.value = this.colorType === 'hex' ? value.currentTarget.value : this._convertColor(value.currentTarget.value);
        this._showElement();
    }

    _showElement(){
        this.$.clearButton.classList.remove('hide-element');
        this.$.transparentPreview.classList.add('hide-element');
        this.$.colorPreview.classList.remove('hide-element');
    }
    
    _hideElement(){
        this.$.clearButton.classList.add('hide-element');
        this.$.transparentPreview.classList.remove('hide-element');
        this.$.colorPreview.classList.add('hide-element');
    }
}

window.customElements.define('paper-input-color', PaperInputColor);