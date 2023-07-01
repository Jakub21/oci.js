
// Generates an unique ID
export let generateUID = () => {
  let timestamp = Date.now().toString(16).substring(5);
  let randomSuffix = (Math.random().toString(16)+"000000000").substring(2,8)
  return `${timestamp}-${randomSuffix}`.toUpperCase();
}
