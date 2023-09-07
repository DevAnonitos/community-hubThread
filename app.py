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