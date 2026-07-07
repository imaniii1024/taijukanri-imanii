const STORAGE_KEY = "gkentei-sprint-v1";
const TODAY_TARGET = 20;

const learningCards = [
  {
    id: "ml-basic",
    rank: "A",
    title: "機械学習の基本",
    summary: "教師あり・教師なし・強化学習を、使うデータと目的で切り分ける。G検定の土台になる分野。",
    focus: ["教師あり: 正解ラベルあり", "教師なし: データ構造を見つける", "強化学習: 報酬で方策を学ぶ"]
  },
  {
    id: "metrics",
    rank: "A",
    title: "モデル評価",
    summary: "適合率・再現率・F値・AUCは消去法で差がつきやすい。事例問題で問われやすい。",
    focus: ["適合率: 予測陽性の正しさ", "再現率: 実陽性の拾い切り", "AUC: 分類性能の総合評価"]
  },
  {
    id: "dl-basic",
    rank: "A",
    title: "ディープラーニング基礎",
    summary: "層、活性化関数、誤差関数、正則化、誤差逆伝播法、最適化を役割で覚える。",
    focus: ["ReLUは勾配消失を緩和", "正則化は過学習対策", "Adamは代表的な最適化手法"]
  },
  {
    id: "cnn-rnn-attention",
    rank: "A",
    title: "CNN・RNN・Attention",
    summary: "画像のCNN、時系列のRNN、長距離依存を扱いやすいAttention/Transformerを区別する。",
    focus: ["CNN: 畳み込みで局所特徴", "RNN: 系列データ", "Transformer: Self-Attention中心"]
  },
  {
    id: "genai",
    rank: "A",
    title: "生成AI・基盤モデル",
    summary: "LLM、Diffusion、GAN、VAE、RLHF、マルチモーダルを分類して覚える。",
    focus: ["LLMは大規模言語モデル", "Diffusionはノイズ除去で生成", "CLIPは画像と言語を結びつける"]
  },
  {
    id: "law-ethics",
    rank: "A",
    title: "法律・倫理・ガバナンス",
    summary: "直前期に点が伸びやすい暗記分野。個人情報、著作権、契約、透明性、公平性を押さえる。",
    focus: ["個人情報と匿名加工情報", "AI生成物と著作権", "AIガバナンスと監査"]
  },
  {
    id: "history",
    rank: "B",
    title: "AIの歴史・古典AI",
    summary: "年号より、何が問題だったかを覚える。フレーム問題やシンボルグラウンディング問題は頻出寄り。",
    focus: ["ダートマス会議", "チューリングテスト", "エキスパートシステム"]
  },
  {
    id: "applications",
    rank: "B",
    title: "応用分野",
    summary: "画像認識、自然言語処理、音声処理、モデル軽量化、解釈性はタスクと代表語を紐づける。",
    focus: ["物体検出とセグメンテーション", "BERTとword2vec", "SHAP、LIME、Grad-CAM"]
  },
  {
    id: "math",
    rank: "C",
    title: "数理・統計",
    summary: "深追いしすぎない。平均、分散、標準偏差、条件付き確率、相関、最尤法を優先する。",
    focus: ["相関と因果は別", "最小二乗法", "正規分布と二項分布"]
  }
];

const questions = [
  {
    id: "q001",
    category: "機械学習",
    card: "ml-basic",
    rank: "A",
    question: "正解ラベル付きデータを用いて、未知データの分類や数値予測を行う学習はどれか。",
    choices: ["教師あり学習", "教師なし学習", "強化学習", "自己符号化"],
    answer: 0,
    explanation: "教師あり学習は、入力データと正解ラベルのペアから分類や回帰を学習する。"
  },
  {
    id: "q002",
    category: "機械学習",
    card: "ml-basic",
    rank: "A",
    question: "顧客データを似た特徴ごとにグループ化する用途に最も近い手法はどれか。",
    choices: ["k-means法", "ロジスティック回帰", "Q学習", "交差エントロピー"],
    answer: 0,
    explanation: "k-means法は代表的なクラスタリング手法で、教師なし学習に分類される。"
  },
  {
    id: "q003",
    category: "機械学習",
    card: "ml-basic",
    rank: "A",
    question: "行動の結果として得られる報酬を最大化するように方策を学ぶ枠組みはどれか。",
    choices: ["強化学習", "教師なし学習", "線形回帰", "主成分分析"],
    answer: 0,
    explanation: "強化学習では、エージェントが環境と相互作用し、報酬を最大化する方策を学ぶ。"
  },
  {
    id: "q004",
    category: "機械学習",
    card: "ml-basic",
    rank: "B",
    question: "分類問題で使われる代表的な教師あり学習モデルはどれか。",
    choices: ["ロジスティック回帰", "k-means法", "PCA", "t-SNE"],
    answer: 0,
    explanation: "ロジスティック回帰は、二値分類などで使われる教師あり学習モデル。"
  },
  {
    id: "q005",
    category: "機械学習",
    card: "ml-basic",
    rank: "B",
    question: "多数の決定木を組み合わせて予測性能を高めるアンサンブル手法はどれか。",
    choices: ["ランダムフォレスト", "SVM", "主成分分析", "SARSA"],
    answer: 0,
    explanation: "ランダムフォレストは複数の決定木を使うバギング系のアンサンブル手法。"
  },
  {
    id: "q006",
    category: "モデル評価",
    card: "metrics",
    rank: "A",
    question: "陽性と予測したもののうち、実際に陽性だった割合を表す指標はどれか。",
    choices: ["適合率", "再現率", "正解率", "AUC"],
    answer: 0,
    explanation: "適合率は、陽性と予測した中で本当に陽性だった割合。誤検知を減らしたい時に重要。"
  },
  {
    id: "q007",
    category: "モデル評価",
    card: "metrics",
    rank: "A",
    question: "実際に陽性であるものを、どれだけ陽性として検出できたかを表す指標はどれか。",
    choices: ["再現率", "適合率", "RMSE", "AIC"],
    answer: 0,
    explanation: "再現率は、実陽性のうち予測で拾えた割合。見逃しを減らしたい場面で重要。"
  },
  {
    id: "q008",
    category: "モデル評価",
    card: "metrics",
    rank: "A",
    question: "適合率と再現率の調和平均として定義される指標はどれか。",
    choices: ["F値", "AUC", "MSE", "BIC"],
    answer: 0,
    explanation: "F値は適合率と再現率のバランスを見る指標。"
  },
  {
    id: "q009",
    category: "モデル評価",
    card: "metrics",
    rank: "A",
    question: "訓練データにはよく合うが、未知データで性能が落ちる状態はどれか。",
    choices: ["過学習", "正規化", "転移学習", "蒸留"],
    answer: 0,
    explanation: "過学習は訓練データに過度に適合し、汎化性能が低下した状態。"
  },
  {
    id: "q010",
    category: "モデル評価",
    card: "metrics",
    rank: "B",
    question: "データをk個に分割し、学習と検証を入れ替えながら性能を推定する方法はどれか。",
    choices: ["k分割交差検証", "ホールドアウト検証", "グリッドサーチ", "ミニバッチ学習"],
    answer: 0,
    explanation: "k分割交差検証は、データをk個に分けて検証を繰り返す汎化性能推定の方法。"
  },
  {
    id: "q011",
    category: "ディープラーニング",
    card: "dl-basic",
    rank: "A",
    question: "ニューラルネットワークで非線形性を導入するために使われるものはどれか。",
    choices: ["活性化関数", "混同行列", "AUC", "NDA"],
    answer: 0,
    explanation: "活性化関数により非線形な関係を表現できる。ReLU、シグモイド、tanhなどが代表例。"
  },
  {
    id: "q012",
    category: "ディープラーニング",
    card: "dl-basic",
    rank: "A",
    question: "ディープラーニングの学習で、誤差を出力側から入力側へ伝えて重みを更新する手法はどれか。",
    choices: ["誤差逆伝播法", "主成分分析", "Mini-Max法", "匿名加工"],
    answer: 0,
    explanation: "誤差逆伝播法は、連鎖律を使って各重みの勾配を計算する学習手法。"
  },
  {
    id: "q013",
    category: "ディープラーニング",
    card: "dl-basic",
    rank: "A",
    question: "過学習を抑えるため、学習時に一部のニューロンを無効化する手法はどれか。",
    choices: ["ドロップアウト", "最大値プーリング", "Self-Attention", "A-D変換"],
    answer: 0,
    explanation: "ドロップアウトは正則化手法の一つで、過学習を抑える目的で使われる。"
  },
  {
    id: "q014",
    category: "ディープラーニング",
    card: "dl-basic",
    rank: "B",
    question: "ReLU関数の説明として最も適切なものはどれか。",
    choices: ["入力が0以下なら0、正ならそのまま出力する", "全クラスの確率の合計を1にする", "出力を常に-1から1に収める", "誤差を二乗して平均する"],
    answer: 0,
    explanation: "ReLUはmax(0, x)で表され、勾配消失を緩和しやすい活性化関数。"
  },
  {
    id: "q015",
    category: "ディープラーニング",
    card: "dl-basic",
    rank: "B",
    question: "ディープラーニングの学習にGPUがよく使われる主な理由はどれか。",
    choices: ["行列演算を並列に高速処理しやすいから", "データの著作権を自動判定できるから", "必ず過学習を防げるから", "モデルの説明可能性を保証するから"],
    answer: 0,
    explanation: "GPUは多数の演算を並列処理でき、ニューラルネットワークの行列演算に適している。"
  },
  {
    id: "q016",
    category: "CNN/RNN/Attention",
    card: "cnn-rnn-attention",
    rank: "A",
    question: "画像データの局所的な特徴抽出に特に適したニューラルネットワークはどれか。",
    choices: ["CNN", "RNN", "LSTM", "Q学習"],
    answer: 0,
    explanation: "CNNは畳み込み層により画像の局所特徴を抽出するのに適している。"
  },
  {
    id: "q017",
    category: "CNN/RNN/Attention",
    card: "cnn-rnn-attention",
    rank: "A",
    question: "時系列データや系列データを扱うために使われる基本的なネットワークはどれか。",
    choices: ["RNN", "CNN", "VAE", "SVM"],
    answer: 0,
    explanation: "RNNは過去の状態を内部に持つため、系列データの処理に使われる。"
  },
  {
    id: "q018",
    category: "CNN/RNN/Attention",
    card: "cnn-rnn-attention",
    rank: "A",
    question: "Transformerの中核となる仕組みとして最も適切なものはどれか。",
    choices: ["Self-Attention", "最大値プーリング", "k-means法", "αβ法"],
    answer: 0,
    explanation: "TransformerはSelf-Attentionを中心に構成され、系列内の関係を並列的に扱える。"
  },
  {
    id: "q019",
    category: "CNN/RNN/Attention",
    card: "cnn-rnn-attention",
    rank: "B",
    question: "RNNの勾配消失問題を緩和するために使われる代表的な構造はどれか。",
    choices: ["LSTM", "PCA", "Bagging", "Grad-CAM"],
    answer: 0,
    explanation: "LSTMはゲート機構を持ち、長期依存関係を扱いやすくするRNNの一種。"
  },
  {
    id: "q020",
    category: "CNN/RNN/Attention",
    card: "cnn-rnn-attention",
    rank: "B",
    question: "ResNetで使われ、深いネットワークの学習を助ける構造はどれか。",
    choices: ["スキップ結合", "ワンホットベクトル", "匿名加工情報", "SARSA"],
    answer: 0,
    explanation: "ResNetはスキップ結合により勾配が伝わりやすくなり、深いモデルを学習しやすくする。"
  },
  {
    id: "q021",
    category: "生成AI",
    card: "genai",
    rank: "A",
    question: "LLMの説明として最も適切なものはどれか。",
    choices: ["大量のテキストで学習した大規模言語モデル", "画像だけを圧縮する軽量化手法", "音声を数値化するA-D変換器", "教師なしクラスタリング手法"],
    answer: 0,
    explanation: "LLMはLarge Language Modelの略で、大量のテキストから言語パターンを学習したモデル。"
  },
  {
    id: "q022",
    category: "生成AI",
    card: "genai",
    rank: "A",
    question: "ノイズを徐々に除去する過程を学習し、画像生成などに使われるモデルはどれか。",
    choices: ["Diffusion Model", "決定木", "RNN", "k-means法"],
    answer: 0,
    explanation: "Diffusion Modelはノイズ付加と除去の過程を利用する生成モデル。"
  },
  {
    id: "q023",
    category: "生成AI",
    card: "genai",
    rank: "A",
    question: "人間のフィードバックを用いて、生成AIの出力を人間の好みに近づける学習はどれか。",
    choices: ["RLHF", "PCA", "AUC", "NDA"],
    answer: 0,
    explanation: "RLHFはReinforcement Learning from Human Feedbackの略。人間の評価を使ってモデルを調整する。"
  },
  {
    id: "q024",
    category: "生成AI",
    card: "genai",
    rank: "B",
    question: "画像と言語の対応関係を学習する代表的なマルチモーダルモデルはどれか。",
    choices: ["CLIP", "LeNet", "SARSA", "LIME"],
    answer: 0,
    explanation: "CLIPは画像とテキストを同じ表現空間に対応づけるモデルとして知られる。"
  },
  {
    id: "q025",
    category: "生成AI",
    card: "genai",
    rank: "B",
    question: "生成器と識別器を競わせてデータ生成能力を高めるモデルはどれか。",
    choices: ["GAN", "SVM", "PCA", "AIC"],
    answer: 0,
    explanation: "GANは生成器と識別器が競合しながら学習する生成モデル。"
  },
  {
    id: "q026",
    category: "法律・倫理",
    card: "law-ethics",
    rank: "A",
    question: "特定の個人を識別できる情報の取り扱いを規律する日本の法律はどれか。",
    choices: ["個人情報保護法", "独占禁止法", "特許法", "不正競争防止法"],
    answer: 0,
    explanation: "個人情報保護法は、個人情報や個人データの取り扱いに関するルールを定める。"
  },
  {
    id: "q027",
    category: "法律・倫理",
    card: "law-ethics",
    rank: "A",
    question: "AI生成物について、特に論点になりやすい法律分野はどれか。",
    choices: ["著作権法", "道路交通法", "建築基準法", "労働基準法だけ"],
    answer: 0,
    explanation: "AI生成物では、著作物性、学習データ、利用規約、著作権侵害などが論点になる。"
  },
  {
    id: "q028",
    category: "法律・倫理",
    card: "law-ethics",
    rank: "A",
    question: "AIモデルの判断理由を利用者や関係者に説明できる性質に近い概念はどれか。",
    choices: ["説明可能性", "過学習", "標準偏差", "方策勾配"],
    answer: 0,
    explanation: "説明可能性や透明性はAI倫理・AIガバナンスで重要な論点。"
  },
  {
    id: "q029",
    category: "法律・倫理",
    card: "law-ethics",
    rank: "A",
    question: "データの偏りにより、特定属性の人に不利な予測が生じる問題に最も関係する概念はどれか。",
    choices: ["公平性", "蒸留", "畳み込み", "最小二乗法"],
    answer: 0,
    explanation: "公平性では、アルゴリズムバイアス、サンプリングバイアス、センシティブ属性などが問われる。"
  },
  {
    id: "q030",
    category: "法律・倫理",
    card: "law-ethics",
    rank: "B",
    question: "AI開発を外部に依頼する際、成果完成義務を負う契約類型として最も近いものはどれか。",
    choices: ["請負契約", "匿名加工情報", "交差検証", "教師強制"],
    answer: 0,
    explanation: "請負契約は仕事の完成を目的とする契約。AI開発では準委任契約との違いが論点になる。"
  },
  {
    id: "q031",
    category: "AIの歴史",
    card: "history",
    rank: "B",
    question: "人工知能という研究分野の出発点としてよく言及される会議はどれか。",
    choices: ["ダートマス会議", "パリ協定", "リオ会議", "ブレトンウッズ会議"],
    answer: 0,
    explanation: "ダートマス会議はAI研究の出発点として扱われる代表的な出来事。"
  },
  {
    id: "q032",
    category: "AIの歴史",
    card: "history",
    rank: "B",
    question: "コンピュータが知能を持つかを、人間との会話で判定しようとする考え方はどれか。",
    choices: ["チューリングテスト", "k分割交差検証", "ROC曲線", "CRISP-DM"],
    answer: 0,
    explanation: "チューリングテストは、会話を通じて機械が知的かを判定しようとする考え方。"
  },
  {
    id: "q033",
    category: "AIの歴史",
    card: "history",
    rank: "B",
    question: "現実世界のすべての状況変化を記述することが困難であるという古典AIの問題はどれか。",
    choices: ["フレーム問題", "過学習", "勾配爆発", "データリーケージ"],
    answer: 0,
    explanation: "フレーム問題は、行動によって変わること・変わらないことをすべて記述する難しさを指す。"
  },
  {
    id: "q034",
    category: "応用分野",
    card: "applications",
    rank: "B",
    question: "画像内の物体の位置を矩形などで特定し、種類も判定するタスクはどれか。",
    choices: ["物体検出", "文書要約", "音声合成", "協調フィルタリング"],
    answer: 0,
    explanation: "物体検出は、画像中の物体の場所とカテゴリを推定するタスク。YOLOやSSDなどが関連する。"
  },
  {
    id: "q035",
    category: "応用分野",
    card: "applications",
    rank: "B",
    question: "画像の各ピクセルにクラスを割り当てるタスクはどれか。",
    choices: ["セマンティックセグメンテーション", "質問応答", "機械翻訳", "バンディットアルゴリズム"],
    answer: 0,
    explanation: "セマンティックセグメンテーションはピクセル単位でクラス分類を行う画像認識タスク。"
  },
  {
    id: "q036",
    category: "応用分野",
    card: "applications",
    rank: "B",
    question: "単語を密なベクトルで表現する自然言語処理の代表的手法はどれか。",
    choices: ["word2vec", "ResNet", "DQN", "Grad-CAM"],
    answer: 0,
    explanation: "word2vecは単語の分散表現を得る代表的な手法。CBOWやスキップグラムが関連する。"
  },
  {
    id: "q037",
    category: "応用分野",
    card: "applications",
    rank: "B",
    question: "ブラックボックスモデルの予測理由を説明する手法として適切なものはどれか。",
    choices: ["SHAP", "Q学習", "MSE", "SaaS"],
    answer: 0,
    explanation: "SHAPやLIMEはモデルの解釈性に関する代表的手法。"
  },
  {
    id: "q038",
    category: "応用分野",
    card: "applications",
    rank: "C",
    question: "モデル軽量化の手法として適切なものはどれか。",
    choices: ["量子化", "GDPR", "中国語の部屋", "コールドスタート問題"],
    answer: 0,
    explanation: "量子化、蒸留、プルーニングなどはモデル軽量化の代表的な手法。"
  },
  {
    id: "q039",
    category: "数理・統計",
    card: "math",
    rank: "C",
    question: "2つの変数の線形な関係の強さを表す統計量はどれか。",
    choices: ["相関係数", "F値", "勾配降下法", "Attention"],
    answer: 0,
    explanation: "相関係数は2変数の線形な関係の強さを表す。ただし相関は因果を意味しない。"
  },
  {
    id: "q040",
    category: "数理・統計",
    card: "math",
    rank: "C",
    question: "データのばらつきを表す基本的な統計量はどれか。",
    choices: ["分散", "著作物", "Self-Attention", "NDA"],
    answer: 0,
    explanation: "分散や標準偏差はデータのばらつきを表す基本的な指標。"
  }
];

function createDefaultState() {
  return {
    stats: {},
    knownCards: {},
    today: todayKey(),
    todayCount: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    lastStudyDate: "",
    currentCardIndex: 0
  };
}

let state = loadState();
let currentQuestion = null;
let currentChoices = [];
let filteredCard = null;

const els = {
  screenTitle: document.getElementById("screenTitle"),
  streakDays: document.getElementById("streakDays"),
  todayCount: document.getElementById("todayCount"),
  todayProgress: document.getElementById("todayProgress"),
  accuracyRate: document.getElementById("accuracyRate"),
  weakCount: document.getElementById("weakCount"),
  masteredCount: document.getElementById("masteredCount"),
  learnCard: document.getElementById("learnCard"),
  markKnownBtn: document.getElementById("markKnownBtn"),
  prevCardBtn: document.getElementById("prevCardBtn"),
  nextCardBtn: document.getElementById("nextCardBtn"),
  quizFromCardBtn: document.getElementById("quizFromCardBtn"),
  quizMeta: document.getElementById("quizMeta"),
  questionPriority: document.getElementById("questionPriority"),
  questionCategory: document.getElementById("questionCategory"),
  questionText: document.getElementById("questionText"),
  choices: document.getElementById("choices"),
  answerPanel: document.getElementById("answerPanel"),
  resultText: document.getElementById("resultText"),
  explanationText: document.getElementById("explanationText"),
  nextQuestionBtn: document.getElementById("nextQuestionBtn"),
  skipBtn: document.getElementById("skipBtn"),
  reviewList: document.getElementById("reviewList"),
  clearStatsBtn: document.getElementById("clearStatsBtn")
};

init();

function init() {
  rolloverDayIfNeeded();
  bindEvents();
  renderAll();
  setQuestion();
  registerServiceWorker();
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  els.prevCardBtn.addEventListener("click", () => moveCard(-1));
  els.nextCardBtn.addEventListener("click", () => moveCard(1));
  els.markKnownBtn.addEventListener("click", toggleKnownCard);
  els.quizFromCardBtn.addEventListener("click", () => {
    filteredCard = learningCards[state.currentCardIndex].id;
    switchView("quizView");
    setQuestion();
  });
  els.nextQuestionBtn.addEventListener("click", () => {
    filteredCard = null;
    setQuestion();
  });
  els.skipBtn.addEventListener("click", () => setQuestion());
  els.clearStatsBtn.addEventListener("click", resetStats);
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("is-active", view.id === viewId));
  document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("is-active", button.dataset.view === viewId));

  const titles = {
    learnView: "今日の学習",
    quizView: "問題演習",
    reviewView: "間違い復習"
  };
  els.screenTitle.textContent = titles[viewId];
  if (viewId === "reviewView") renderReview();
}

function renderAll() {
  renderHeader();
  renderLearningCard();
  renderReview();
}

function renderHeader() {
  const total = state.totalAnswered;
  const accuracy = total ? Math.round((state.totalCorrect / total) * 100) : 0;
  const weak = questions.filter((q) => (state.stats[q.id]?.wrong || 0) > (state.stats[q.id]?.correct || 0)).length;
  const mastered = questions.filter((q) => (state.stats[q.id]?.correct || 0) >= 3 && (state.stats[q.id]?.wrong || 0) === 0).length;

  els.streakDays.textContent = state.streak;
  els.todayCount.textContent = state.todayCount;
  els.todayProgress.style.width = `${Math.min(100, Math.round((state.todayCount / TODAY_TARGET) * 100))}%`;
  els.accuracyRate.textContent = `${accuracy}%`;
  els.weakCount.textContent = weak;
  els.masteredCount.textContent = mastered;
}

function renderLearningCard() {
  const card = learningCards[state.currentCardIndex];
  const known = Boolean(state.knownCards[card.id]);
  els.markKnownBtn.textContent = known ? "✓" : "○";
  els.markKnownBtn.setAttribute("aria-label", known ? "理解済みを解除" : "理解済みにする");
  els.learnCard.innerHTML = `
    <div class="card-top">
      <div>
        <p class="eyebrow">${state.currentCardIndex + 1} / ${learningCards.length}</p>
        <h3>${escapeHtml(card.title)}</h3>
      </div>
      <span class="priority-badge rank-${card.rank.toLowerCase()}">重要度${card.rank}</span>
    </div>
    <p>${escapeHtml(card.summary)}</p>
    <ul class="focus-list">
      ${card.focus.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderQuestion() {
  els.answerPanel.hidden = true;
  els.resultText.textContent = "";
  els.explanationText.textContent = "";
  els.quizMeta.textContent = filteredCard ? "Focused Quiz" : "Weighted Quiz";
  els.questionPriority.textContent = `重要度${currentQuestion.rank}`;
  els.questionPriority.className = `pill rank-${currentQuestion.rank.toLowerCase()}`;
  els.questionCategory.textContent = currentQuestion.category;
  els.questionText.textContent = currentQuestion.question;
  els.choices.innerHTML = "";

  currentChoices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice.text;
    button.addEventListener("click", () => answerQuestion(choice.originalIndex, button));
    els.choices.appendChild(button);
  });
}

function renderReview() {
  const items = questions
    .map((question) => ({ question, stat: state.stats[question.id] || { correct: 0, wrong: 0 } }))
    .filter((item) => item.stat.wrong > 0)
    .sort((a, b) => {
      const aScore = a.stat.wrong * 2 - a.stat.correct + rankWeight(a.question.rank);
      const bScore = b.stat.wrong * 2 - b.stat.correct + rankWeight(b.question.rank);
      return bScore - aScore;
    });

  if (!items.length) {
    els.reviewList.innerHTML = `<div class="empty-state">まだ復習対象はないで。問題演習で間違えたものがここに溜まる。</div>`;
    return;
  }

  els.reviewList.innerHTML = items.map(({ question, stat }) => `
    <article class="review-item">
      <h3>${escapeHtml(question.question)}</h3>
      <p>${escapeHtml(question.explanation)}</p>
      <div class="review-meta">
        <span>重要度${question.rank}</span>
        <span>${escapeHtml(question.category)}</span>
        <span>正解 ${stat.correct || 0}</span>
        <span>ミス ${stat.wrong || 0}</span>
      </div>
    </article>
  `).join("");
}

function setQuestion() {
  currentQuestion = pickWeightedQuestion(filteredCard);
  currentChoices = shuffle(currentQuestion.choices.map((text, originalIndex) => ({ text, originalIndex })));
  renderQuestion();
}

function answerQuestion(originalIndex) {
  const isCorrect = originalIndex === currentQuestion.answer;
  const buttons = [...els.choices.querySelectorAll(".choice-button")];

  buttons.forEach((button, buttonIndex) => {
    const choice = currentChoices[buttonIndex];
    button.disabled = true;
    if (choice.originalIndex === currentQuestion.answer) button.classList.add("is-correct");
    if (choice.originalIndex === originalIndex && !isCorrect) button.classList.add("is-wrong");
  });

  recordAnswer(currentQuestion.id, isCorrect);
  els.resultText.textContent = isCorrect ? "正解" : "不正解";
  els.resultText.style.color = isCorrect ? "var(--good)" : "var(--danger)";
  els.explanationText.textContent = currentQuestion.explanation;
  els.answerPanel.hidden = false;
  renderHeader();
  renderReview();
}

function recordAnswer(questionId, isCorrect) {
  rolloverDayIfNeeded();
  state.stats[questionId] ||= { correct: 0, wrong: 0, last: "" };
  if (isCorrect) {
    state.stats[questionId].correct += 1;
    state.totalCorrect += 1;
  } else {
    state.stats[questionId].wrong += 1;
  }
  state.stats[questionId].last = new Date().toISOString();
  state.totalAnswered += 1;
  state.todayCount += 1;
  updateStreak();
  saveState();
}

function pickWeightedQuestion(cardId) {
  const pool = cardId ? questions.filter((question) => question.card === cardId) : questions;
  const weighted = [];

  pool.forEach((question) => {
    const stat = state.stats[question.id] || { correct: 0, wrong: 0 };
    let weight = rankWeight(question.rank);
    weight += Math.max(0, stat.wrong - stat.correct) * 5;
    if (stat.wrong > 0) weight += 3;
    if (stat.correct >= 3 && stat.wrong === 0) weight = Math.max(1, weight - 4);
    for (let i = 0; i < weight; i += 1) weighted.push(question);
  });

  return weighted[Math.floor(Math.random() * weighted.length)];
}

function rankWeight(rank) {
  if (rank === "A") return 9;
  if (rank === "B") return 5;
  return 2;
}

function moveCard(delta) {
  state.currentCardIndex = (state.currentCardIndex + delta + learningCards.length) % learningCards.length;
  saveState();
  renderLearningCard();
}

function toggleKnownCard() {
  const card = learningCards[state.currentCardIndex];
  state.knownCards[card.id] = !state.knownCards[card.id];
  if (!state.knownCards[card.id]) delete state.knownCards[card.id];
  saveState();
  renderLearningCard();
}

function resetStats() {
  const ok = window.confirm("学習記録をリセットする？");
  if (!ok) return;
  state = createDefaultState();
  saveState();
  renderAll();
  setQuestion();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...createDefaultState(), ...saved, stats: saved?.stats || {}, knownCards: saved?.knownCards || {} };
  } catch {
    return createDefaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function rolloverDayIfNeeded() {
  const today = todayKey();
  if (state.today !== today) {
    state.today = today;
    state.todayCount = 0;
    saveState();
  }
}

function updateStreak() {
  const today = todayKey();
  if (state.lastStudyDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = dateKey(yesterday);
  state.streak = state.lastStudyDate === yesterdayKey ? state.streak + 1 : 1;
  state.lastStudyDate = today;
}

function todayKey() {
  return dateKey(new Date());
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
