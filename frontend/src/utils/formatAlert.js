function formatAlert(text) {
  // convert text to array
  text = text.split("/")[1].replaceAll("-", " ");
  return text.charAt(0).toUpperCase() + text.substring(1);
}

export default formatAlert;
