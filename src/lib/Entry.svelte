<script>
  import newUniqueId from "locally-unique-id-generator";

  export var value = 0;
  export var delta = 1;
  export var min = 0;
  export var max = 10;

  export var label;
  export var color;

  let inputRef;
  let id = newUniqueId();

  const handleChange = (increase) => (event) => {
    value = increase
      ? value + delta < max
        ? value + delta
        : max
      : value - delta > min
      ? value - delta
      : min;
    inputRef.focus();
  };
</script>

<label for={id}>{label}</label>
<div class="chic" bg={color}></div>
<div class="container">
  <button class="decrement" on:click={handleChange(0)}>-</button>
  <input bind:this={inputRef} type="number" {id} {value} />
  <button class="increment" on:click={handleChange(1)}>+</button>
</div>

<style>
  div.container {
    width: auto;
    display: flex;
    align-items: stretch;
    overflow: hidden;
    width: 4rem;
    border-radius: 0.5rem;
    border: 1px solid var(--green);
    position: relative;
  }
  button,
  input[type="number"] {
    border: none;
    padding: 0;
    width: 100%;
  }

  button {
    font-size: 0.8rem;
    flex: 1;
    font-weight: 800;
  }

  button:active {
    transform: translateY(2px);
    box-shadow: 0 -2px #0003;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
    flex: 3;
    text-align: center;
    font-size: 1rem;
    background-color: var(--white);
  }

  input[type="number"]:disabled {
    background-color: var(--white);
  }

  input:focus {
    outline: none;
    box-shadow: inset 0px 1px 5px #0006;
  }

  label {
    text-align: right;
  }

  div.chic {
    width: 0.5rem;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    margin: auto;
  }
</style>
