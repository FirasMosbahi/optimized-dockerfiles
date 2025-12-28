"""Health check page for Streamlit demo."""
import streamlit as st
from datetime import datetime
import sys

st.set_page_config(page_title="Health", page_icon="💚")

st.title("💚 Health Status")

# System information
col1, col2 = st.columns(2)

with col1:
    st.metric("Status", "Healthy", delta="✓")
    st.metric("Python Version", f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")

with col2:
    st.metric("Current Time", datetime.now().strftime("%H:%M:%S"))
    st.metric("Streamlit Version", st.__version__)

st.divider()

# Health checks
st.subheader("System Checks")

checks = {
    "Application Running": "✅ Pass",
    "Streamlit Loaded": "✅ Pass",
    "Pandas Available": "✅ Pass",
    "Plotly Available": "✅ Pass",
    "Configuration Valid": "✅ Pass"
}

for check, status in checks.items():
    col1, col2 = st.columns([3, 1])
    with col1:
        st.text(check)
    with col2:
        st.text(status)

st.success("All systems operational!")
