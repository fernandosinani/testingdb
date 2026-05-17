from flask import Flask, render_template_string, request
from main import add_two_numbers, list_all_numbers

app = Flask(__name__)

HTML = """
<!doctype html>
<h1>Calculator</h1>
<form method="get" action="/add">
  <h2>Add Three Numbers</h2>
  <input name="a" placeholder="a" value="{{ a }}" />
  <input name="b" placeholder="b" value="{{ b }}" />
  <input name="c" placeholder="c" value="{{ c }}" />
  <button type="submit">Add</button>
  <p>Result: {{ add_result }}</p>
</form>
<form method="get" action="/list">
  <h2>List Numbers</h2>
  <input name="nums" placeholder="e.g. 5,10,15" value="{{ nums }}" style="width:200px" />
  <button type="submit">Show List</button>
</form>
{% if list_items %}
  <ul>
  {% for item in list_items %}
    <li>{{ item }}</li>
  {% endfor %}
  </ul>
{% endif %}
"""


@app.route("/")
def home():
    return render_template_string(HTML)


@app.route("/add")
def add():
    a = int(request.args.get("a", 0))
    b = int(request.args.get("b", 0))
    c = int(request.args.get("c", 0))
    result = add_two_numbers(a, b, c)
    return render_template_string(
        HTML, add_result=result, a=a, b=b, c=c
    )


@app.route("/list")
def list_nums():
    raw = request.args.get("nums", "")
    try:
        items = [int(x.strip()) for x in raw.split(",") if x.strip()]
    except ValueError:
        items = []
        raw = ""
    return render_template_string(HTML, nums=raw, list_items=items)


if __name__ == "__main__":
    app.run(debug=True)
