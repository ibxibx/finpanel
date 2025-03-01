import React, { useState, useRef, useEffect } from "react";

const Settings = () => {
  // Create refs for different DOM elements
  const notificationsRef = useRef(null);
  const darkModeRef = useRef(null);
  const colorPickerRef = useRef(null);
  const imageRef = useRef(null);
  const paragraphRef = useRef(null);

  // State for tracking dimensions of a DOM element
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // State to track image dimensions
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // State to track paragraph content
  const [paragraphContent, setParagraphContent] = useState(
    "This paragraph can be edited and styled using React refs. Click the buttons below to interact with it."
  );

  // State to track input value
  const [inputValue, setInputValue] = useState("");

  // Focus the notifications checkbox when component mounts
  useEffect(() => {
    if (notificationsRef.current) {
      notificationsRef.current.focus();
    }
  }, []);

  // Measure the paragraph element when content changes
  useEffect(() => {
    if (paragraphRef.current) {
      setDimensions({
        width: paragraphRef.current.offsetWidth,
        height: paragraphRef.current.offsetHeight,
      });
    }
  }, [paragraphContent]);

  // Function to toggle a checkbox using a ref
  const toggleCheckbox = (ref) => {
    if (ref.current) {
      ref.current.checked = !ref.current.checked;

      // Trigger a change event so any listeners would be notified
      const event = new Event("change", { bubbles: true });
      ref.current.dispatchEvent(event);
    }
  };

  // Function to change paragraph text color
  const changeParagraphColor = (color) => {
    if (paragraphRef.current) {
      paragraphRef.current.style.color = color;
    }
  };

  // Function to increase font size
  const increaseFontSize = () => {
    if (paragraphRef.current) {
      const currentSize = window.getComputedStyle(
        paragraphRef.current
      ).fontSize;
      const newSize = parseInt(currentSize) + 2;
      paragraphRef.current.style.fontSize = `${newSize}px`;

      // Update measurements
      setDimensions({
        width: paragraphRef.current.offsetWidth,
        height: paragraphRef.current.offsetHeight,
      });
    }
  };

  // Function to decrease font size
  const decreaseFontSize = () => {
    if (paragraphRef.current) {
      const currentSize = window.getComputedStyle(
        paragraphRef.current
      ).fontSize;
      const newSize = Math.max(10, parseInt(currentSize) - 2); // Don't go below 10px
      paragraphRef.current.style.fontSize = `${newSize}px`;

      // Update measurements
      setDimensions({
        width: paragraphRef.current.offsetWidth,
        height: paragraphRef.current.offsetHeight,
      });
    }
  };

  // Function to measure image dimensions
  const measureImage = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  // Function to clear input using ref
  const clearInput = () => {
    if (colorPickerRef.current) {
      colorPickerRef.current.value = "";
      setInputValue("");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Settings</h1>

      {/* Preferences section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              ref={notificationsRef} /* Attach the ref to the input */
              type="checkbox"
              id="notifications"
              className="rounded border-gray-300"
            />
            <label htmlFor="notifications" className="ml-2">
              Enable notifications
            </label>
          </div>
          <div className="flex items-center">
            <input
              ref={darkModeRef} /* Attach the ref to the input */
              type="checkbox"
              id="darkMode"
              className="rounded border-gray-300"
            />
            <label htmlFor="darkMode" className="ml-2">
              Dark mode
            </label>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => toggleCheckbox(notificationsRef)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Toggle Notifications
            </button>
            <button
              onClick={() => toggleCheckbox(darkModeRef)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Toggle Dark Mode
            </button>
          </div>
        </div>
      </div>

      {/* React Refs Demo section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">React Refs Demo</h2>
        <div className="space-y-6">
          {/* Example 1: DOM Manipulation */}
          <div>
            <h3 className="text-md font-medium mb-2">
              DOM Manipulation with Refs
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p
                ref={paragraphRef} /* Attach the ref to the paragraph */
                className="mb-4 transition-all duration-300"
              >
                {paragraphContent}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => changeParagraphColor("red")}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Red Text
                </button>
                <button
                  onClick={() => changeParagraphColor("blue")}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Blue Text
                </button>
                <button
                  onClick={() => changeParagraphColor("green")}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Green Text
                </button>
                <button
                  onClick={increaseFontSize}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  A+
                </button>
                <button
                  onClick={decreaseFontSize}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  A-
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Paragraph dimensions: {dimensions.width} x {dimensions.height}{" "}
                pixels
              </div>
            </div>
          </div>

          {/* Example 2: Focus and Form Control */}
          <div>
            <h3 className="text-md font-medium mb-2">Focus and Form Control</h3>
            <div className="flex items-center space-x-2">
              <input
                ref={colorPickerRef} /* Attach the ref to the input */
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type here..."
                className="px-3 py-2 border border-gray-300 rounded-lg flex-grow"
              />
              <button
                onClick={() =>
                  colorPickerRef.current.focus()
                } /* Use ref to focus */
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Focus
              </button>
              <button
                onClick={clearInput} /* Use ref to clear input */
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Example 3: Media and Element Properties */}
          <div>
            <h3 className="text-md font-medium mb-2">
              Media and Element Properties
            </h3>
            <div>
              <img
                ref={imageRef} /* Attach the ref to the image */
                src="https://via.placeholder.com/400x200"
                alt="Placeholder"
                className="rounded-lg mb-2 w-full max-w-md"
                onLoad={measureImage} /* Measure image when loaded */
              />
              <div className="text-sm text-gray-500">
                {imageSize.width > 0 ? (
                  <span>
                    Original image dimensions: {imageSize.width} x{" "}
                    {imageSize.height} pixels
                  </span>
                ) : (
                  <span>Loading image dimensions...</span>
                )}
              </div>
              <button
                onClick={measureImage}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Measure Image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brief explanation of refs */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">About React Refs</h3>
        <p className="text-sm text-gray-700">
          React refs provide a way to access DOM nodes or React elements
          directly. They're useful for managing focus, triggering animations,
          integrating with third-party DOM libraries, and measuring elements.
        </p>
      </div>
    </div>
  );
};

export default Settings;
