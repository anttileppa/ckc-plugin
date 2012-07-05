/*
 * Collaboration plugin for CKEditor
 * Copyright (C) 2012 Antti Leppä / Foyt
 * http://www.foyt.fi
 * 
 * License: 
 * 
 * Licensed under GNU Lesser General Public License Version 2.1 or later (the "LGPL") 
 * http://www.gnu.org/licenses/lgpl.html
 */

(function() {
  CKEDITOR.plugins.ckc = {
    propertyHandlers: new Array(),
    registerPropertyHandler: function (handler) {
      CKEDITOR.plugins.ckc.propertyHandlers.push(handler);
    }
  };
  
  CKEDITOR.plugins.ckc.PropertyHandler = CKEDITOR.tools.createClass({
    $: function() { },
    proto: {
      getValue: function (editor) {
        alert('not implemented');
      },
      setValue: function (editor, value) {
        alert('not implemented');
      },
      getName: function () {
        alert('not implemented');
      }
    }  
  }); 
  
  CKEDITOR.plugins.ckc.TitlePropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function() { },
    proto: {
      getValue: function (editor) {
        return editor.document.getElementsByTag('title').getItem(0).data('cke-title');
      },
      setValue: function (editor, value) {
        editor.document.getElementsByTag('title').getItem(0).data('cke-title', value);
      },
      getName: function () {
        return 'title';
      }
    }  
  });

  CKEDITOR.plugins.ckc.LangDirPropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function() { },
    proto: {
      getValue: function (editor) {
        return editor.document.getBody().getDirection();
      },
      setValue: function (editor, value) {
        var body = editor.document.getBody();
        if (value)
          body.setAttribute('dir', value);
        else
          body.removeAttribute('dir');
        
        body.removeStyle('direction');
      },
      getName: function () {
        return 'langDir';
      }
    }  
  });

  CKEDITOR.plugins.ckc.LangCodePropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function() { },
    proto: {
      getValue: function (editor) {
        var documentElement = editor.document.getDocumentElement();
        var lang = documentElement.getAttribute('xml:lang');
        if (lang)
          return lang;
        lang = documentElement.getAttribute('lang');
        if (lang)
          return lang;
        return null;
      },
      setValue: function (editor, value) {
        var documentElement = editor.document.getDocumentElement();
        if (value)
          documentElement.setAttributes({'xml:lang':value, lang:value});
        else
          documentElement.removeAttributes({'xml:lang':1, lang:1} );
      },
      getName: function () {
        return 'langCode';
      }
    }  
  });

  CKEDITOR.plugins.ckc.CharsetPropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function() { },
    proto: {
      getValue: function (editor) {
        var metas = editor.document.getHead().getElementsByTag('meta');
        for ( var i = 0, l = metas.count(); i < l; i++ ) {
          var meta = metas.getItem(i);
          if (meta.getAttribute('http-equiv') == "content-type") {
            var content = meta.getAttribute("content");
            if (content.match( /charset=[^=]+$/ )) {
              return content.substring( content.indexOf( '=' ) + 1);
            }
            return null;
          }
        }
      },
      setValue: function (editor, value) {
        var content = value ? "text/html; charset=" + value : null;
        
        var metas = editor.document.getHead().getElementsByTag('meta');
        for ( var i = 0, l = metas.count(); i < l; i++ ) {
          var meta = metas.getItem(i);
          if (meta.getAttribute('http-equiv') == "content-type") {
            if (content) {
              meta.setAttribute("content", content);
            } else {
              meta.remove();
            }
            
            break;
          }
        }
        
        if (content) {
          var meta = new CKEDITOR.dom.element('meta', editor.document);
          meta.setAttribute('http-equiv', 'content-type');
          meta.setAttribute('content', content );
          editor.document.getHead().append(meta);
        }
      },
      getName: function () {
        return 'charset';
      }
    }  
  });

  CKEDITOR.plugins.ckc.DocTypePropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function() { },
    proto: {
      getValue: function (editor) {
        return editor.docType;
      },
      setValue: function (editor, value) {
        editor.docType = value;
      },
      getName: function () {
        return 'docType';
      }
    }  
  });

  CKEDITOR.plugins.ckc.TextColorPropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function() { },
    proto: {
      getValue: function (editor) {
        return editor.document.getBody().getComputedStyle('color');
      },
      setValue: function (editor, value) {
        var body = editor.document.getBody();
        body.removeAttribute('text');
        if (value)
          body.setStyle('color', value);
        else
          body.removeStyle('color');
      },
      getName: function () {
        return 'textColor';
      }
    }  
  });

  CKEDITOR.plugins.ckc.BackgroundColorPropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function() { },
    proto: {
      getValue: function (editor) {
        return editor.document.getBody().getComputedStyle('background-color');
      },
      setValue: function (editor, value) {
        var body = editor.document.getBody();
        body.removeAttribute('bgcolor');
        if (value) {
          body.setStyle('background-color', value);
        } else {
          body.removeStyle('background-color');
        }
      },
      getName: function () {
        return 'backgroundColor';
      }
    }  
  });

  CKEDITOR.plugins.ckc.BackgroundImagePropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function() { },
    proto: {
      getValue: function (editor) {
        return editor.document.getBody().getComputedStyle('background-image');
      },
      setValue: function (editor, value) {
        var body = editor.document.getBody();
        body.removeAttribute('bgcolor');
        if (value) {
          body.setStyle('background-image', value);
        } else {
          body.removeStyle('background-image');
        }
      },
      getName: function () {
        return 'backgroundImage';
      }
    }  
  });

  CKEDITOR.plugins.ckc.BackgroundAttachmentPropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function() { },
    proto: {
      getValue: function (editor) {
        return editor.document.getBody().getComputedStyle('background-attachment');
      },
      setValue: function (editor, value) {
        var body = editor.document.getBody();
        if (value) {
          body.setStyle('background-attachment', value);
        } else {
          body.removeStyle('background-attachment');
        }
      },
      getName: function () {
        return 'backgroundAttachment';
      }
    }  
  });

  CKEDITOR.plugins.ckc.PageMarginPropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function(name, property) { 
      this._name = name;
      this._property = property;
    },
    proto: {
      getValue: function (editor) {
        var body = editor.document.getBody();
        return body.getStyle('margin-' + this._property ) || body.getAttribute('margin' + this._property );
      },
      setValue: function (editor, value) {
        var body = editor.document.getBody();
        body.removeAttribute('margin' + this._property);
        if (value) {
          body.setStyle('margin-' + this._property, value);
        } else {
          body.removeStyle('margin-' + this._property);
        }
      },
      getName: function () {
        return this._name;
      }
    }  
  });

  CKEDITOR.plugins.ckc.MetaPropertyHandler = CKEDITOR.tools.createClass({
    base: CKEDITOR.plugins.ckc.PropertyHandler,
    $: function(name, property) { 
      this._name = name;
      this._property = property;
    },
    proto: {
      getValue: function (editor) {
        var metas = editor.document.getHead().getElementsByTag('meta');
        for ( var i = 0, l = metas.count(); i < l; i++ ) {
          var meta = metas.getItem(i);
          if (meta.getAttribute('name') == this._property) {
            return meta.getAttribute("content");
          }
        }
      },
      setValue: function (editor, value) {
        var metas = editor.document.getHead().getElementsByTag('meta');
        for ( var i = 0, l = metas.count(); i < l; i++ ) {
          var meta = metas.getItem(i);
          if (meta.getAttribute('name') == this._property) {
            meta.setAttribute("content", value);
            return;
          }
        }

        if (value) {
          var meta = new CKEDITOR.dom.element('meta', editor.document);
          meta.setAttribute('name', this._property);
          meta.setAttribute('content', value);
          editor.document.getHead().append(meta);
        }
      },
      getName: function () {
        return this._name;
      }
    }  
  });
  
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.TitlePropertyHandler());
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.LangDirPropertyHandler());
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.LangCodePropertyHandler());
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.CharsetPropertyHandler());
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.DocTypePropertyHandler());
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.TextColorPropertyHandler());
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.BackgroundColorPropertyHandler());
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.BackgroundImagePropertyHandler());
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.BackgroundAttachmentPropertyHandler());
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.PageMarginPropertyHandler('pageMarginLeft', 'left'));
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.PageMarginPropertyHandler('pageMarginTop', 'top'));
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.PageMarginPropertyHandler('pageMarginRight', 'right'));
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.PageMarginPropertyHandler('pageMarginBottom', 'bottom'));
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.MetaPropertyHandler("metaKeywords", "keywords"));
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.MetaPropertyHandler("metaDescription", "description"));
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.MetaPropertyHandler("metaAuthor", "author"));
  CKEDITOR.plugins.ckc.registerPropertyHandler(new CKEDITOR.plugins.ckc.MetaPropertyHandler("metaCopyright", "copyright"));
  
  /**
   * Local variables
   */
  var connectorUrl = null;
  var diffMatchPatch = null;
  var documentId = null;
  var savedRevision = null;
  var savedContent = null;
  var savedProperties = null;
  var token = null;
  var messageHandler = null;
  var lang = null;
  var instanceDestroyed = false;
  var pollingPaused = false;
  
  /**
   * Returns document's id
   */
  function getDocumentId() {
    return documentId;
  }
  
  /**
   * Updates document's id
   */
  function updateDocumentId(aDocumentId) {
    documentId = aDocumentId;
  }
  
  /**
   * Returns last saved revision number
   */
  function getSavedRevision() {
    return savedRevision;
  }
  
  /**
   * Updates last saved revision number
   */
  function updateSavedRevision(revision) {
    savedRevision = revision;
  }
  
  /**
   * Returns last saved content
   */
  function getSavedContent() {
    return savedContent;
  }
  
  /**
   * Updates last saved content
   */
  function updateSavedContent(content) {
    savedContent = content;
  }
  
  /**
   * Returns editor's current content
   */
  function getCurrentContent(editor) {
    if (editor.config.fullPage) {
      return editor.document.getBody().getHtml();
    } else {
      return editor.getSnapshot();
    }
  }
  
  /**
   * Updates editor's current content
   */
  function updateCurrentContent(editor, content) {
    if (editor.config.fullPage) {
      return editor.document.getBody().setHtml(content);
    } else {
      return editor.loadSnapshot(content);
    }
  }

  function getSavedProperties() {
    return savedProperties; 
  }
  
  function updateSavedProperties(properties) {
    savedProperties = properties; 
  }
  
  function getCurrentProperties(editor) {
    var result = new Object();
    for (var i = 0, l = CKEDITOR.plugins.ckc.propertyHandlers.length; i < l; i++) {
      var value = CKEDITOR.plugins.ckc.propertyHandlers[i].getValue(editor);
      if (value)
        result[CKEDITOR.plugins.ckc.propertyHandlers[i].getName()] = value;
    }
    return result;
  }
  
  function updateCurrentProperty(editor, property, value) {
    for (var i = 0, l = CKEDITOR.plugins.ckc.propertyHandlers.length; i < l; i++) {
      if (CKEDITOR.plugins.ckc.propertyHandlers[i].getName() == property) {
        CKEDITOR.plugins.ckc.propertyHandlers[i].setValue(editor, value);
      }
    }
  }
  
  /**
   * Returns access token
   */
  function getToken() {
    return token;
  }
  
  /**
   * Sets access token
   */
  function setToken(aToken) {
    token = aToken;
  }
  
  /**
   * Displays message to user
   */
  function displayMessage(severity, message) {
    if ((typeof messageHandler) == "function") {
      messageHandler(severity, message);
    } else {
      alert(message);
    }
  }
  
  /**
   * Server connector "class"
   */
  CKCConnector = {
    /**
     * Creates new xml http request object. Code is copied from CKEditor's ajax plugin
     **/
    createXMLHttpRequest: function() {
      if ( !CKEDITOR.env.ie || location.protocol != 'file:' )
      try { return new XMLHttpRequest(); } catch(e) {}
      try { return new ActiveXObject( 'Msxml2.XMLHTTP' ); } catch (e) {}
      try { return new ActiveXObject( 'Microsoft.XMLHTTP' ); } catch (e) {}
      
      return null;
    },  
    /**
     * Executes a post request
     * 
     * @param url requets url
     * @param data request data (raw)
     * @param callback method to be executed after the call. 
     */
    _doPost: function (url, data, callback) {
      var xhr = this.createXMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      
      if (!CKEDITOR.env.webkit) {
        // WebKit refuses to send these headers as unsafe
        xhr.setRequestHeader("Content-length", data ? data.length : 0);
        xhr.setRequestHeader("Connection", "close");
      }
      
      if (getToken())
        xhr.setRequestHeader("Authorization", "token " + getToken());
      
      xhr.onreadystatechange = function() { 
        if(xhr.readyState == 4) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            if (!response) {
              // Request was probably aborted...
              return;
            }
            
            try {
              var responseJson = eval("(" + response + ")");
              if ((typeof callback) == 'function')
                callback(true, responseJson);
            } catch (e)  {
              displayMessage('SEVERE', lang.couldNotParseServerResponse);
            }
          } else {
            if ((typeof callback) == 'function') {
              var message = xhr.responseText;
              if (xhr.status == 403) {
                displayMessage('SEVERE', lang.permissionDenied);
              } 
              
              if (!message) {
                message = lang.unknownServerError;
              }

              callback(false, {
                errorMessage: message,
                errorCode: xhr.status
              });
            }
          }
        }
      };
      
      xhr.send(data);
    },
    /**
     * Executes init call 
     * 
     * @param editor CKEditor instance
     * @param callback method to be called when request is done
     */
    init: function (editor, callback) {
      var id = getDocumentId();
      
      this._doPost(connectorUrl + '?action=INIT&documentId=' + id, null, function (success, responseJson) {
        if (!success) {
          displayMessage('SEVERE', lang.initializationError);
        } else {
          if (responseJson.status == "OK") {
            setToken(responseJson.token);
            
            if ((typeof callback) == 'function') {
              callback();
            }
          } else {
            displayMessage('SEVERE', lang.initializationError);
          }
        }
      });
    },
    createDocument: function (editor, callback) {
      var content = getCurrentContent(editor);
      
      this._doPost(connectorUrl + "?action=CREATE&content=" + content, null, function (success, responseJson) {
        if (!success) {
          displayMessage('SEVERE', lang.documentCreateError);
        } else {        
          switch (responseJson.status) {
            case "OK":
              updateSavedContent(content);
              updateDocumentId(responseJson.documentId);
              updateSavedRevision(responseJson.revisionNumber);
              setToken(responseJson.token);
  
              if ((typeof callback) == 'function')
                callback();
            break;
            default:
              displayMessage('SEVERE', lang.unknownServerError);
            break;
          }
        }
      });
    },
    
    /**
     * Checks for new revisions
     * 
     * @param editor CKEditor instance
     * @param callback method to be called when request is done
     */
    checkUpdates: function (editor, callback) {
      var id = getDocumentId();
      
      this._doPost(connectorUrl + '?action=UPDATE&documentId=' + id + "&revisionNumber=" + getSavedRevision(), null, function (success, responseJson) {
        if (!success) {
          displayMessage('SEVERE', responseJson.errorMessage);
          if ((typeof callback) == 'function') {
            callback();
          }
        } else {        
          switch (responseJson.status) {
            case "OK":
              var revisions = responseJson.revisions;
              if (revisions && revisions.length > 0) {
                var text = getCurrentContent(editor);
                var revisionNumber = getSavedRevision();
                var patchedText = text;
                var conflict = false;
                
                for (var i = 0, l = revisions.length; i < l; i++) {
                  var revision = revisions[i];
                  if (revision.patch) {
                    var patchResult = applyPatch(revision.patch, patchedText);
                    if (patchResult.applied) {
                      patchedText = patchResult.patchedText;
                    } else {
                      displayMessage('WARNING', lang.conflictWhileApplyingUpdates);
                      conflict = true;
                      break;
                    }
                  }
                  
                  if (revision.properties) {
                    var changedProperties = new Array();
                    for (var i = 0, l = revision.properties.length; i < l; i++) {
                      updateCurrentProperty(editor, revision.properties[i].name, revision.properties[i].value);
                      changedProperties.push({
                        name: revision.properties[i].name,
                        value: revision.properties[i].value
                      });
                    }
                    
                    updateSavedProperties(getCurrentProperties(editor));
                    
                    editor.fire('ckcPropertiesChanged', {
                      changedProperties: changedProperties,
                      source: "remote"
                    });
                  }
                  
                  revisionNumber = revision.number;
                }
                
                if (conflict == false) {
                  updateSavedRevision(revisionNumber);
    
                  if (patchedText !== text) {
                    updateSavedContent(patchedText);
                    updateCurrentContent(editor, patchedText);
                    editor.fire('ckcContentChanged', {
                      source: "remote"
                    });
                  }
                } else {
                  revert(editor);
                }
              }
            break;
            case "CONFLICT":
              displayMessage('WARNING', lang.conflictWhileApplyingUpdates);
              revert(editor);
            break;
            default:
              displayMessage('SEVERE', lang.unknownServerError);
            break;
          }
  
          if ((typeof callback) == 'function')
            callback();
        }
      });
    },
    /**
     * Saves changes
     * 
     * @param editor CKEditor instance
     * @param callback method to be called when request is done
     */
    saveChanges: function (editor, callback) {
      var contentDirty = editor.checkDirty();
      var properties = getCurrentProperties(editor);
      var propertiesDirty = !hashCompare(properties, getSavedProperties());
      var snapshot = null;
      var original = null;
      var propertiesDiff = null;
      
      if (contentDirty||propertiesDirty) {
        var id = getDocumentId();
        var data = '';
        
        if (contentDirty) {
          original = getSavedContent();
          snapshot = getCurrentContent(editor);
          if (original != snapshot) {
            var diff = makeDiff(original, snapshot);
            var patch = makePatch(original, diff);
            data = 'patch=' + encodeURIComponent(patch);
          } else {
            contentDirty = false;
          }
        }
        
        if (propertiesDirty) {
          propertiesDiff = hashDiff(properties, getSavedProperties());
          var propertiesPatch = hashSerialize(propertiesDiff);
          data = (data ? data + '&' : '') + 'properties=' + encodeURIComponent(propertiesPatch);
        }
        
        if (contentDirty||propertiesDirty) {
          this._doPost(connectorUrl + '?action=SAVE&documentId=' + id + "&revision=" + getSavedRevision(), data, function (success, responseJson) {
            if (!success) {
              displayMessage('SEVERE', responseJson.errorMessage);
              if ((typeof callback) == 'function') {
                callback();
              }
            } else {    
              switch (responseJson.status) {
                case "OK":
                  if (responseJson.revisionNumber) {
                    if (contentDirty) {
                      updateSavedContent(snapshot);
                      editor.fire('ckcContentChanged', {
                        source: "local"
                      });
                    }
                    
                    if (propertiesDirty) {
                      updateSavedProperties(properties);
                      
                      var changedProperties = new Array();
                      
                      for (var property in propertiesDiff) {
                        changedProperties.push({
                          name: property,
                          value: propertiesDiff[property]
                        });
                      }
                      
                      editor.fire('ckcPropertiesChanged', {
                        changedProperties: changedProperties,
                        source: "local"
                      });
                    }
                    updateSavedRevision(responseJson.revisionNumber);
                  }
                break;
                case "CONFLICT":
                  displayMessage('WARNING', lang.conflictWhileApplyingUpdates);
                  revert(editor);
  //                updateCurrentContent(editor, original);
                break;
                default:
                  displayMessage('SEVERE', lang.unknownServerError);
                break;
              }
              
              editor.resetDirty();
              
              if ((typeof callback) == 'function')
                callback();
            }
          });
        } else {
          if ((typeof callback) == 'function')
            callback();
        }
      } else {
        if ((typeof callback) == 'function')
          callback();
      }
    },
    loadDocument: function (editor, callback) {
      var id = getDocumentId();
      
      this._doPost(connectorUrl + '?action=LOAD&documentId=' + id, null, function (success, responseJson) {
        if (!success) {
          displayMessage('SEVERE', responseJson.errorMessage);
          if ((typeof callback) == 'function') {
            callback();
          }
        } else {
          if (getSavedContent() != responseJson.content) {
            updateCurrentContent(editor, responseJson.content);
            updateSavedContent(responseJson.content);
            editor.fire('ckcContentChanged', {
              source: "remote"
            });
          }
          
          if (responseJson.properties && (responseJson.properties.length > 0)) {
            
            var changedProperties = new Array();
            for (var i = 0, l = responseJson.properties.length; i < l; i++) {
              updateCurrentProperty(editor, responseJson.properties[i].name, responseJson.properties[i].value);
              changedProperties.push({
                name: responseJson.properties[i].name,
                value: responseJson.properties[i].value
              });
            }
  
            updateSavedProperties(getCurrentProperties(editor));
            
            editor.fire('ckcPropertiesChanged', {
              changedProperties: changedProperties,
              source: "remote"
            });
          }
          
          updateSavedRevision(responseJson.revisionNumber);
          
          if ((typeof callback) == 'function') {
            callback();
          }
        }
      });
    }
  };
  
  /**
   * Creates diff object from two strings
   */
  function makeDiff(a, b) {
    var diff = diffMatchPatch.diff_main(a, b);
    diffMatchPatch.diff_cleanupEfficiency(diff);
    return diff;
  }
  
  /**
   * Turns diff into a patch
   */
  function makePatch(text, diff) {
    return diffMatchPatch.patch_toText(diffMatchPatch.patch_make(text, diff));
  }
  
  /**
   * Applies patch into text
   */
  function applyPatch(patch, text) {
    var patchApplied = true;
    
    var result = diffMatchPatch.patch_apply(diffMatchPatch.patch_fromText(patch), text);
    for (var j = 0, jl = result[1].length; j < jl; j++) {
      if (result[1][j] == false) {
        patchApplied = false;
      }
    }
    
    if (patchApplied) {
      text = result[0];
    }
    
    return {
      applied: patchApplied,
      patchedText: text
    };
  }
  
  /**
   * Compares two hash objects
   */
  function hashCompare(h1, h2) {
    if (h1 && h2) {
      var h2c = CKEDITOR.tools.clone(h2);
      
      for (var k in h1) {
        if (!h2c[k] || h1[k] !== h2c[k])
          return false;
        delete h2c[k];
      }
      
      for (var k in h2c) {
        if (!h1[k] || h1[k] !== h2c[k])
          return false;
      }

      return true;
    }
    
    return false;
  }
  
  /**
   * Computes diffs from two hash objects
   */
  function hashDiff(h1, h2) {
    if (h1 && h2) {
      var result = new Object();
      
      var h2c = CKEDITOR.tools.clone(h2);
      
      for (var k in h1) {
        if (!h2c[k] || h1[k] !== h2c[k]) {
          result[k] = h1[k];
        }

        delete h2c[k];
      }
      
      for (var k in h2c) {
        result[k] = null;
      }
      
      return result;
    } else if (h1) {
      return CKEDITOR.tools.clone(h1);
    } else if (h2) {
      return CKEDITOR.tools.clone(h2);
    } 
      
    return new Object();
  }
  
  /**
   * Serializes property hash
   */
  function hashSerialize(hash) {
    var result = '';
    for (var key in hash) {
      if (result) {
        result += ';';
      }
      
      var value = hash[key];
      if (value) {
        value = value.replace(/([\:\;])/g,"\\\$1");
      }
      result += key + ':' + value;
    }
    return result;
  }
  
  /**
   * Saves editor's content
   */
  function save(editor, callback) {
    if (getDocumentId()) {
      CKCConnector.checkUpdates(editor, function () {
        CKCConnector.saveChanges(editor, callback);
      });
    } else {
      CKCConnector.createDocument(editor, function () {
        displayMessage('INFO', lang.documentCreatedMessage);
        checkUpdates(editor);
        if ((typeof callback) == "function") {
          callback();
        }
      });
    }
  }
  
  function revert(editor) {
    pollingPaused = true;
    CKCConnector.loadDocument(editor, function () {
      pollingPaused = false;
    });
  }
  
  /**
   * Scheduled task for periodically checking updates
   */
  function checkUpdates(editor) {
    CKEDITOR.tools.setTimeout(function () {
      if (instanceDestroyed == false) {
        if (editor.mode == 'wysiwyg') {
          if (pollingPaused == false) {
            save(editor, function () {
              checkUpdates(editor);
            });
          }
        } else {
          checkUpdates(editor);
        }
      }
    }, editor.config.ckc.updateInterval);
  }
  
  /**
   * Scheduled task for periodically informing user about unsaved document
   */  
  function checkUnsaved(editor) {
    CKEDITOR.tools.setTimeout(function () {
      if (instanceDestroyed == false) {
        if (!getDocumentId()) {
          displayMessage('WARNING', lang.unsavedDocumentWarning);
          checkUnsaved(editor);
        }
      }
    }, editor.config.ckc.unsavedWarningInterval);
  }
  
  /**
   * Plugin registration
   */
  CKEDITOR.plugins.add('ckc', {
    lang : [ 'fi', 'en' ],
    requires: ['wysiwygarea'],
    init : function(editor) {
      lang = editor.lang.ckc;
      
      editor.on( 'instanceReady', function() {
        CKEDITOR.scriptLoader.load( editor.plugins.ckc.path + 'required/diff_match_patch.js' , function () {
          diffMatchPatch = new diff_match_patch();
          connectorUrl = editor.config.ckc.connectorUrl;
          messageHandler = editor.config.ckc.messageHandler;
          
          updateDocumentId(editor.config.ckc.documentId);
          updateSavedRevision(editor.config.ckc.originalRevision);
          updateSavedContent(getCurrentContent(editor));
          updateSavedProperties(getCurrentProperties(editor));
          
          editor.addCommand('ckcsave', {
            exec : function(editor) {
              save(editor);
            }
          });
          
          editor.addCommand('ckcrevert', {
            exec : function(editor) {
              if (editor.mode == 'wysiwyg') {
                revert(editor);
              } else {
                displayMessage('WARNING', lang.cannotRevertDocumentNotWysiwygMode);
              }
            }
          });
          
          editor.on("destroy", function (e) {
            instanceDestroyed = true;
          });
          
          if (getDocumentId()) {
            CKCConnector.init(editor, function () {
              checkUpdates(editor);
            });
          }
          
          if (editor.config.ckc.unsavedWarningInterval) {
            checkUnsaved(editor);
          }
        });
      });

      editor.ui.addButton('CKCSave', {
        label : lang.saveButtonTooltip,
        command : 'ckcsave'
      });

      editor.ui.addButton('CKCRevert', {
        label : lang.revertButtonTooltip,
        command : 'ckcrevert'
      });
}
  });
})();
