import React from "react";

export default function about() {
  return (
    <section className="dark:text-black px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <h2 className="text-2xl font-semibold sm:text-4xl">关于本项目</h2>
        <p className="mt-4 mb-8 dark:text-gray-700">中山大学大学生创新创业训练计划项目——算法超市</p>
        <div className="space-y-4">
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
              Ex orci laoreet egestas sapien magna egestas scelerisque?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-700">
              Lectus iaculis orci metus vitae ligula dictum per. Nisl per nullam taciti at
              adipiscing est.{" "}
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
              Lorem at arcu rutrum viverra metus sapien venenatis lobortis odio?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-700">
              Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas
              tincidunt neque vehicula potenti.{" "}
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
              Eleifend feugiat sollicitudin laoreet adipiscing bibendum suscipit erat?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-700">
              Justo libero tellus integer tincidunt justo semper consequat venenatis aliquet
              imperdiet. Ultricies urna proin fusce nulla pretium sodales vel magna et massa euismod
              vulputate sed.{" "}
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
