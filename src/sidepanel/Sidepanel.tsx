export const Sidepanel = () => {
  return <main className="w-[300px] px-4 py-5 text-center text-gray-700">
    <div>Popup</div>

    <button className="btn mt-2" onClick={e => browser.runtime.openOptionsPage()}>
      Open Options
    </button>
    <div className="mt-2">
      <span className="opacity-50">Storage:</span> storageDemo
    </div>
  </main>
};
