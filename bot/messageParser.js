const commands = {
  "!111": () => `111 is 7 in binary`
}
const validCommands = Object.keys(commands);

const parseMessage = ({target, context, msg, self}) => {
  //if validCommands.some(cmd => msg.includes(cmd))
  const commandName = msg.trim();
  if (commandName === '!111') {
    return `111 is 7 in binary`
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
    return false;
  }
}

exports.parseMessage = parseMessage;