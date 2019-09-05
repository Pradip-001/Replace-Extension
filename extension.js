// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "first" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

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
    function() {
      takeinputAndReplace();
      //runUndo();
    }
  );
  let disposable3 = vscode.commands.registerCommand(
    "extension.replaceSelectionRedo",
    function() {
      //takeinputAndReplace();
      runRedo();
    }
  );

  context.subscriptions.push(disposable3);
  context.subscriptions.push(disposable2);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
