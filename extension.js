const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "first" is now active!');

  async function takeinputAndReplace() {
    var sel = vscode.window.activeTextEditor.selection;
    var data = vscode.window.activeTextEditor.document.getText(sel);

    var input1 = await vscode.window.showInputBox({
      placeHolder: "replace from"
    });

    if (input1 != null) {
      var input2 = await vscode.window.showInputBox({
        placeHolder: "replace with"
      });
    }

    var replacement = {
      from: input1,
      to: input2
    };

    data = data.split(replacement.from).join(replacement.to);

    vscode.window.activeTextEditor.edit(editBuilder => {
      editBuilder.replace(sel, data);
    });
  }

  function runUndo() {
    vscode.commands.executeCommand("undo");
  }
  function runRedo() {
    vscode.commands.executeCommand("editor.action.wordHighlight.next");
  }

  let disposable2 = vscode.commands.registerCommand(
    "extension.replaceSelection",
    function () {
      takeinputAndReplace();
      //runUndo();
    }
  );
  let disposable3 = vscode.commands.registerCommand(
    "extension.replaceSelectionRedo",
    function () {
      //takeinputAndReplace();
      runRedo();
    }
  );

  context.subscriptions.push(disposable3);
  context.subscriptions.push(disposable2);
}

exports.activate = activate;

function deactivate() { }

module.exports = {
  activate,
  deactivate
};
