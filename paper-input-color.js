import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior';

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
                
                paper-input-container {
                   --paper-input-suffix : {
                        cursor: pointer;
                   }
                }
            </style>

            <paper-input-container>
                <div id="colorPreview"  slot="prefix" on-click="_onClick" prefix></div>

                <label hidden$="[[!label]]" slot="label" aria-hidden="true">[[label]]</label>
                
                <iron-input bind-value="{{value}}" invalid="{{invalid}}" slot="input" on-click="_onClick" disabled>
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
        if (this.value && this.colorType === 'rgb') {
            this.value = this._convertColor(this.value);
        }
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
        if (color.substring(0, 1) !== '#') {
            return color;
        }else{
            return `rgb(${parseInt(color.substring(1, 3), 16)}, ${parseInt(color.substring(3, 5), 16)}, ${parseInt(color.substring(5), 16)})`;   
        }
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
        this.$.colorPreview.style.cssText = `background-image: url('data:image/png;base64,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dHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTIyVDExOjQzOjU5KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0yM1QxMjozODo0OCswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNS0yM1QxMjozODo0OCswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2JiMTEzZWItODVlNS00YjdmLWIwNTEtNDA1NTYyMTc4NTVkIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdiYjExM2ViLTg1ZTUtNGI3Zi1iMDUxLTQwNTU2MjE3ODU1ZCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjdiYjExM2ViLTg1ZTUtNGI3Zi1iMDUxLTQwNTU2MjE3ODU1ZCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2JiMTEzZWItODVlNS00YjdmLWIwNTEtNDA1NTYyMTc4NTVkIiBzdEV2dDp3aGVuPSIyMDE5LTA1LTIyVDExOjQzOjU5KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+RlVhUwAAARlJREFUWIXt08tOwkAYBWA6vYotllgikYVBwWAaHrUPBqGoEELc44oaKjNgL9PGX5r4CrM5s5jMmdXJ/N9o8/nifP4ZjR4Hg/uyLNfrzeGQTibPCmNd14w6CXFqXZZpmlmWcS7URsaYttt9SikNwyiKwrIsum0OqmJTRo+iyPdvOOez2aIoyuk07HZ9hTGO32hnNNeqqqhsrxd0Ol6e52pjENxSPy2OX4nXcPjQ79/RA263H2n6PR4/KYx/5Ml/knxRTV3Xbds+Hvl+n6iN9ANAHuRBHuRBHuRBHuRBHuRBHuRBHuRBHuRBHuRBHuRBHuRBHuT/yS+X71KWYfjS0FMVV6uNECdGg2xdlue5juPQD1AbXfe63b76BQ1vCvKxxln2AAAAAElFTkSuQmCC');`
    }
}

window.customElements.define('paper-input-color', PaperInputColor);
