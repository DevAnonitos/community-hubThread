import pandas as pd
import streamlit as st
import plotly.express as px

st.set_page_config(page_title="Sales Dashboard", page_icon=":bar_chart", layout="wide")

df = pd.read_csv(
    filepath_or_buffer="D:/2-bai tap cua dev/Project training web/ComunityHub-app/dashboard/supermarket_sales.csv",
    engine="python"
)

st.sidebar.header("Please enter field here...")
city = st.sidebar.multiselect(
    "Select the city:",
    options=df["City"].unique().tolist(),
    default=df["City"].unique().tolist(),
    key="city_multiselect",
)

customer_type= st.sidebar.multiselect(
    "Select the Customer type:",
    options=df["Customer_type"].unique().tolist(),
    default=df["Customer_type"].unique().tolist(),
    key="customer_type_multiselect",
)

gender = st.sidebar.multiselect(
    "Select the Gender:",
    options=df["Gender"].unique().tolist(),
    default=df["Gender"].unique().tolist(),
    key="gender_multiselect",
)

df_selection = df.query(
    "City == @city & `Customer_type` == @customer_type & Gender == @gender"
)

st.title(":bar_chart: Sales Dashboard")
st.markdown("##")

total_Sales = int(df_selection["Total"].sum())
avg_rating = round(df_selection["Rating"].mean(), 1)
start_rating = ":star:" * int(round(avg_rating, 0))
avg_sale_by_transaction = round(df_selection["Total"].mean(), 2)

left_col, mid_col, right_col = st.columns(3)

with left_col:
    st.subheader("Total Sales: ")
    st.subheader(f"US $ {total_Sales:,}")
    
with mid_col:
    st.subheader("Average Rating: ")
    st.subheader(f"{avg_rating} {start_rating}")
    
with right_col:
    st.subheader("Average Sales Per Transaction: ")
    st.subheader(f"US $ {avg_sale_by_transaction}")
st.markdown("""---""")

st.dataframe(df)

sales_by_product_line = df_selection.groupby(by=["Product line"])[["Total"]].sum().sort_values(by="Total")

fig_product_sales = px.bar(
    sales_by_product_line,
    x="Total",
    y=sales_by_product_line.index,
    orientation="h",
    title="<b>Sales by Product Line</b>",
    color_discrete_sequence=["#0083B8"] * len(sales_by_product_line),
    template="plotly_white",
)
fig_product_sales.update_layout(
    plot_bgcolor="rgba(0,0,0,0)",
    xaxis=(dict(showgrid=False))
)


sales_by_hour = df_selection.groupby(by=["Time"])[["Total"]].sum()
fig_hourly_sales = px.bar(
    sales_by_hour,
    x=sales_by_hour.index,
    y="Total",
    title="<b>Sales by hour</b>",
    color_discrete_sequence=["#0083B8"] * len(sales_by_hour),
    template="plotly_white",
)
fig_hourly_sales.update_layout(
    xaxis=dict(tickmode="linear"),
    plot_bgcolor="rgba(0,0,0,0)",
    yaxis=(dict(showgrid=False)),
)


left_column, right_column = st.columns(2)
left_column.plotly_chart(fig_hourly_sales, use_container_width=True)
right_column.plotly_chart(fig_product_sales, use_container_width=True)


hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)