useEffect(() => {
  const blurEffect = 'blur-xl';  // You can change this to blur-sm, blur-lg, etc.
  const colors = ['rgba(0,96,96,1)'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const shapes = ['rounded-full', 'rounded-lg', 'rounded-md', 'rounded-t-lg'];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  const randomPosition = {
    position: 'absolute',
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`,
  };

  const randomSize = {
    width: `${Math.random() * 200 + 100}px`,
    height: `${Math.random() * 200 + 100}px`,
  };

  const newBlobStyle = {
    ...randomPosition,
    ...randomSize,
    backgroundColor: randomColor,
    filter: blurEffect,
    borderRadius: randomShape,
  };

  console.log(newBlobStyle); // Log the new style
  setBlobStyle(newBlobStyle);
}, []);
