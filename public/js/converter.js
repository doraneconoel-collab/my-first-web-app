// ここからコードを書いてください
// 1. 関数の定義と export
export function setupConverter() {
  // 2. 変数への要素の取得
  const converterForm = document.querySelector(".converter-form");
  const converterInput = document.querySelector(".converter-input");
  const converterFrom = document.querySelector(".converter-from");
  const converterTo = document.querySelector(".converter-to");
  const converterResult = document.querySelector(".converter-result");

  // 3. 単位データの定義（画像10枚目の通り）
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 },
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 },
  ];

  // 4. 単位選択欄の初期化（ループ処理で option を追加）
  lengthUnit.forEach((unit) => {
    // 変換元の select に追加
    const optionFrom = document.createElement("option");
    optionFrom.value = unit.base; // value 属性には base を設定
    optionFrom.textContent = unit.name; // テキストには name を設定
    converterFrom.appendChild(optionFrom);

    // 変換先の select に追加
    const optionTo = document.createElement("option");
    optionTo.value = unit.base;
    optionTo.textContent = unit.name;
    converterTo.appendChild(optionTo);
  });

  // 初期値の設定
  // meter (base: 1) から kilometer (base: 1000)
  converterFrom.value = 1;
  converterTo.value = 1000;

  // 5. 変換処理の実装
  function update() {
    // parseFloat で数値に変換
    const inputValue = parseFloat(converterInput.value);

    // 数値でない場合はエラーメッセージを表示して終了
    if (isNaN(inputValue)) {
      converterResult.textContent = "Please enter a valid number";
      return;
    }

    // 選択されている単位の base 値を取得
    const fromBase = parseFloat(converterFrom.value);
    const toBase = parseFloat(converterTo.value);

    // 計算式：(入力値 * 変換元の単位) / (変換先の単位)
    const resultValue = (inputValue * fromBase) / toBase;

    // 単位名を取得（表示用）
    const fromName =
      converterFrom.options[converterFrom.selectedIndex].textContent;
    const toName = converterTo.options[converterTo.selectedIndex].textContent;

    // 結果の表示（toFixed で小数点以下3桁に変換）
    converterResult.textContent = `${inputValue} ${fromName} = ${resultValue.toFixed(3)} ${toName}`;
  }

  // 6. リアルタイム変換（イベントリスナー）
  converterInput.addEventListener("input", update);
  converterFrom.addEventListener("change", update);
  converterTo.addEventListener("change", update);

  // 初回実行
  update();
}
