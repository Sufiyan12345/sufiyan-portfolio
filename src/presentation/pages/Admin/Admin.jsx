import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Inbox,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquare,
  Search,
  UserRound,
  X,
} from "lucide-react";

import "./Admin.css";

const API_BASE_URL =
  "https://sufiyan-portfolio.onrender.com/api";

/* =========================================================
   AUTH HELPERS
========================================================= */

const getAdminToken = () => {
  return (
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken")
  );
};

const clearAdminSession = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");

  sessionStorage.removeItem("adminToken");
  sessionStorage.removeItem("adminUser");
};

const redirectToLogin = () => {
  clearAdminSession();

  window.location.href = "/admin/login";
};

const getAdminUser = () => {
  try {
    const storedUser =
      localStorage.getItem("adminUser") ||
      sessionStorage.getItem("adminUser");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch {
    return null;
  }
};

/* =========================================================
   AUTHENTICATED API REQUEST
========================================================= */

const authenticatedFetch = async (
  endpoint,
  options = {}
) => {
  const token = getAdminToken();

  if (!token) {
    redirectToLogin();

    throw new Error(
      "Authentication required."
    );
  }

  const headers = {
    ...(options.body
      ? {
          "Content-Type":
            "application/json",
        }
      : {}),
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  let response;

  try {
    response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );
  } catch {
    throw new Error(
      "Unable to connect with the admin API."
    );
  }

  if (response.status === 401) {
    redirectToLogin();

    throw new Error(
      "Your session has expired. Please login again."
    );
  }

  return response;
};

/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquare,
  },
];

/* =========================================================
   STATUS CONFIG
========================================================= */

const statusConfig = {
  new: {
    label: "New",
    className: "status-new",
    icon: Inbox,
  },

  read: {
    label: "Read",
    className: "status-read",
    icon: Clock3,
  },

  replied: {
    label: "Replied",
    className: "status-replied",
    icon: CheckCircle2,
  },
};

/* =========================================================
   DATE FORMATTER
========================================================= */

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

/* =========================================================
   ADMIN COMPONENT
========================================================= */

const Admin = () => {
  const [activeSection, setActiveSection] =
    useState("overview");

  const [contacts, setContacts] =
    useState([]);

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
  });

  const [selectedContact, setSelectedContact] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [error, setError] =
    useState("");

  const [adminUser, setAdminUser] =
    useState(getAdminUser());

  /* =========================================================
     FETCH CONTACTS
  ========================================================= */

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await authenticatedFetch(
          "/admin/contacts"
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to fetch messages."
        );
      }

      setContacts(
        result.data || []
      );
    } catch (error) {
      console.error(
        "Fetch Contacts Error:",
        error
      );

      if (
        error.message !==
          "Authentication required." &&
        error.message !==
          "Your session has expired. Please login again."
      ) {
        setError(
          error.message ||
            "Unable to connect with the admin API."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FETCH STATS
  ========================================================= */

  const fetchStats = async () => {
    try {
      const response =
        await authenticatedFetch(
          "/admin/contacts/stats"
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to fetch statistics."
        );
      }

      setStats(
        result.data || {
          total: 0,
          new: 0,
          read: 0,
          replied: 0,
        }
      );
    } catch (error) {
      console.error(
        "Fetch Stats Error:",
        error
      );

      if (
        error.message !==
          "Authentication required." &&
        error.message !==
          "Your session has expired. Please login again."
      ) {
        setError(
          error.message ||
            "Unable to fetch statistics."
        );
      }
    }
  };

  /* =========================================================
     INITIAL AUTH CHECK
  ========================================================= */

  useEffect(() => {
    const token =
      getAdminToken();

    if (!token) {
      redirectToLogin();
      return;
    }

    const storedUser =
      getAdminUser();

    if (storedUser) {
      setAdminUser(
        storedUser
      );
    }

    fetchContacts();
    fetchStats();
  }, []);

  /* =========================================================
     FILTER CONTACTS
  ========================================================= */

  const filteredContacts =
    useMemo(() => {
      return contacts.filter(
        (contact) => {
          const search =
            searchTerm
              .toLowerCase()
              .trim();

          const matchesSearch =
            !search ||
            contact.name
              ?.toLowerCase()
              .includes(search) ||
            contact.email
              ?.toLowerCase()
              .includes(search) ||
            contact.projectType
              ?.toLowerCase()
              .includes(search) ||
            contact.message
              ?.toLowerCase()
              .includes(search);

          const matchesStatus =
            statusFilter === "all" ||
            contact.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      contacts,
      searchTerm,
      statusFilter,
    ]);

  /* =========================================================
     ANALYTICS
  ========================================================= */

  const analytics = useMemo(() => {
    const now =
      new Date();

    const days = [];

    for (
      let index = 6;
      index >= 0;
      index--
    ) {
      const date =
        new Date(now);

      date.setDate(
        now.getDate() -
          index
      );

      date.setHours(
        0,
        0,
        0,
        0
      );

      days.push({
        date,
        label:
          date.toLocaleDateString(
            "en-IN",
            {
              weekday:
                "short",
            }
          ),
        count: 0,
      });
    }

    contacts.forEach(
      (contact) => {
        if (
          !contact.createdAt
        ) return;

        const created =
          new Date(
            contact.createdAt
          );

        created.setHours(
          0,
          0,
          0,
          0
        );

        const matchingDay =
          days.find(
            (day) =>
              day.date.getTime() ===
              created.getTime()
          );

        if (
          matchingDay
        ) {
          matchingDay.count +=
            1;
        }
      }
    );

    const maxCount =
      Math.max(
        ...days.map(
          (day) =>
            day.count
        ),
        1
      );

    const repliedRate =
      stats.total > 0
        ? Math.round(
            (stats.replied /
              stats.total) *
              100
          )
        : 0;

    const newRate =
      stats.total > 0
        ? Math.round(
            (stats.new /
              stats.total) *
              100
          )
        : 0;

    return {
      days,
      maxCount,
      repliedRate,
      newRate,
    };
  }, [
    contacts,
    stats,
  ]);

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const updateStatus = async (
    contactId,
    status
  ) => {
    try {
      setUpdatingStatus(true);

      const response =
        await authenticatedFetch(
          `/admin/contacts/${contactId}/status`,
          {
            method: "PATCH",
            body: JSON.stringify({
              status,
            }),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to update status."
        );
      }

      setContacts(
        (prev) =>
          prev.map(
            (contact) =>
              contact._id ===
              contactId
                ? {
                    ...contact,
                    status:
                      result.data
                        ?.status,
                    updatedAt:
                      result.data
                        ?.updatedAt,
                  }
                : contact
          )
      );

      setSelectedContact(
        (prev) =>
          prev &&
          prev._id ===
            contactId
            ? {
                ...prev,
                status:
                  result.data
                    ?.status,
                updatedAt:
                  result.data
                    ?.updatedAt,
              }
            : prev
      );

      await fetchStats();
    } catch (error) {
      console.error(
        "Update Status Error:",
        error
      );

      if (
        error.message !==
          "Authentication required." &&
        error.message !==
          "Your session has expired. Please login again."
      ) {
        alert(
          error.message ||
            "Unable to update message status."
        );
      }
    } finally {
      setUpdatingStatus(false);
    }
  };

  /* =========================================================
     SELECT MESSAGE
  ========================================================= */

  const openMessage = (
    contact
  ) => {
    setSelectedContact(
      contact
    );
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const handleNavigation = (
    section
  ) => {
    setActiveSection(
      section
    );

    setSidebarOpen(
      false
    );
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    clearAdminSession();

    setAdminUser(null);
    setSelectedContact(null);

    window.location.href =
      "/admin/login";
  };

  /* =========================================================
     RETRY
  ========================================================= */

  const handleRetry = () => {
    setError("");

    fetchContacts();
    fetchStats();
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="admin-page">

      <div className="admin-bg-grid" />

      <div className="admin-bg-glow admin-bg-glow-one" />
      <div className="admin-bg-glow admin-bg-glow-two" />

      {/* MOBILE OVERLAY */}

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="admin-mobile-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSidebarOpen(
                false
              )
            }
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen
            ? "admin-sidebar-open"
            : ""
        }`}
      >

        <div className="admin-sidebar-top">

          <a
            href="/"
            className="admin-brand"
          >
            <span className="admin-brand-mark">
              S
            </span>

            <span className="admin-brand-text">
              SUFIYAN

              <span>
                ADMIN
              </span>
            </span>
          </a>

          <button
            className="admin-mobile-close"
            onClick={() =>
              setSidebarOpen(
                false
              )
            }
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>

        </div>

        <div className="admin-sidebar-section">

          <span className="admin-sidebar-label">
            WORKSPACE
          </span>

          <nav className="admin-nav">

            {navItems.map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <button
                    key={
                      item.id
                    }
                    className={`admin-nav-item ${
                      activeSection ===
                      item.id
                        ? "admin-nav-item-active"
                        : ""
                    }`}
                    onClick={() =>
                      handleNavigation(
                        item.id
                      )
                    }
                  >

                    <span className="admin-nav-icon">
                      <Icon
                        size={17}
                      />
                    </span>

                    <span>
                      {
                        item.label
                      }
                    </span>

                    {item.id ===
                      "messages" &&
                      stats.new >
                        0 && (
                        <span className="admin-nav-count">
                          {
                            stats.new
                          }
                        </span>
                      )}

                  </button>
                );
              }
            )}

          </nav>
        </div>

        <div className="admin-sidebar-bottom">

          <div className="admin-system-status">

            <span className="admin-status-dot" />

            <div>
              <span>
                System online
              </span>

              <small>
                API connected
              </small>
            </div>

          </div>

          <a
            href="/"
            className="admin-back-link"
          >
            <ArrowLeft
              size={15}
            />

            <span>
              Back to portfolio
            </span>
          </a>

        </div>

      </aside>

      {/* MAIN */}

      <main className="admin-main">

        {/* TOPBAR */}

        <header className="admin-topbar">

          <div className="admin-topbar-left">

            <button
              className="admin-menu-button"
              onClick={() =>
                setSidebarOpen(
                  true
                )
              }
              aria-label="Open sidebar"
            >
              <Menu
                size={20}
              />
            </button>

            <div>

              <span className="admin-eyebrow">
                SUFIYAN /
                CONTROL CENTER
              </span>

              <h1>
                {activeSection ===
                "messages"
                  ? "Messages"
                  : "Overview"}
              </h1>

            </div>

          </div>

          <div className="admin-topbar-right">

            <div className="admin-live-indicator">
              <span />
              LIVE
            </div>

            <button
              className="admin-icon-button"
              aria-label="Notifications"
              onClick={() =>
                handleNavigation(
                  "messages"
                )
              }
            >
              <Bell
                size={18}
              />

              {stats.new >
                0 && (
                <span className="admin-notification-dot" />
              )}
            </button>

            <div className="admin-user">

              <div className="admin-user-avatar">
                <UserRound
                  size={17}
                />
              </div>

              <div className="admin-user-info">

                <strong>
                  {adminUser?.name ||
                    "Sufiyan Khan"}
                </strong>

                <span>
                  {adminUser?.email ||
                    "Administrator"}
                </span>

              </div>

            </div>

            <button
              type="button"
              className="admin-icon-button"
              onClick={
                handleLogout
              }
              title="Logout"
              aria-label="Logout"
            >
              <ArrowLeft
                size={18}
              />
            </button>

          </div>

        </header>

        {/* CONTENT */}

        <div className="admin-content">

          {error && (
            <motion.div
              className="admin-error"
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <span>
                {error}
              </span>

              <button
                onClick={
                  handleRetry
                }
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* =================================================
              OVERVIEW
          ================================================= */}

          {activeSection ===
            "overview" && (
            <motion.section
              className="admin-section"
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >

              {/* WELCOME */}

              <div className="admin-welcome">

                <div>

                  <span className="admin-section-kicker">
                    DASHBOARD
                    OVERVIEW
                  </span>

                  <h2>
                    Your workspace,
                    <br />

                    <span>
                      at a glance.
                    </span>
                  </h2>

                  <p>
                    Monitor new inquiries
                    and keep track of
                    your latest project
                    conversations.
                  </p>

                </div>

                <div className="admin-welcome-decoration">

                  <span>
                    01
                  </span>

                  <div />

                  <span>
                    2026
                  </span>

                </div>

              </div>

              {/* STATS */}

              <div className="admin-stats-grid">

                <StatCard
                  label="TOTAL MESSAGES"
                  value={
                    stats.total
                  }
                  detail="All inquiries"
                  icon={
                    Inbox
                  }
                  accent="blue"
                />

                <StatCard
                  label="NEW"
                  value={
                    stats.new
                  }
                  detail="Needs attention"
                  icon={
                    MessageSquare
                  }
                  accent="bright"
                />

                <StatCard
                  label="READ"
                  value={
                    stats.read
                  }
                  detail="Reviewed"
                  icon={
                    Clock3
                  }
                  accent="muted"
                />

                <StatCard
                  label="REPLIED"
                  value={
                    stats.replied
                  }
                  detail="Completed"
                  icon={
                    CheckCircle2
                  }
                  accent="success"
                />

              </div>

              {/* =================================================
                  ANALYTICS
              ================================================= */}

              <div className="admin-analytics-grid">

                {/* ACTIVITY */}

                <div className="admin-panel admin-activity-panel">

                  <PanelHeader
                    eyebrow="MESSAGE ACTIVITY"
                    title="Last 7 days"
                    action={
                      <div className="admin-analytics-live">
                        <span />
                        LIVE DATA
                      </div>
                    }
                  />

                  <div className="admin-chart">

                    <div className="admin-chart-y-axis">

                      <span>
                        {
                          analytics.maxCount
                        }
                      </span>

                      <span>
                        {
                          Math.ceil(
                            analytics.maxCount /
                              2
                          )
                        }
                      </span>

                      <span>
                        0
                      </span>

                    </div>

                    <div className="admin-chart-main">

                      <div className="admin-chart-grid-lines">

                        <span />
                        <span />
                        <span />

                      </div>

                      <div className="admin-chart-bars">

                        {analytics.days.map(
                          (
                            day
                          ) => {

                            const height =
                              day.count ===
                              0
                                ? 5
                                : Math.max(
                                    14,
                                    (day.count /
                                      analytics.maxCount) *
                                      100
                                  );

                            return (
                              <div
                                className="admin-chart-column"
                                key={
                                  day.date.toISOString()
                                }
                              >

                                <div className="admin-chart-bar-wrap">

                                  <span className="admin-chart-value">
                                    {
                                      day.count
                                    }
                                  </span>

                                  <motion.div
                                    className="admin-chart-bar"
                                    initial={{
                                      height: 0,
                                    }}
                                    animate={{
                                      height: `${height}%`,
                                    }}
                                    transition={{
                                      duration: 0.7,
                                      ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                      ],
                                    }}
                                  />

                                </div>

                                <span className="admin-chart-label">
                                  {
                                    day.label
                                  }
                                </span>

                              </div>
                            );
                          }
                        )}

                      </div>

                    </div>

                  </div>

                  <div className="admin-chart-footer">

                    <div>
                      <span>
                        TOTAL IN PERIOD
                      </span>

                      <strong>
                        {
                          analytics.days.reduce(
                            (
                              sum,
                              day
                            ) =>
                              sum +
                              day.count,
                            0
                          )
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        REPLY RATE
                      </span>

                      <strong>
                        {
                          analytics.repliedRate
                        }%
                      </strong>
                    </div>

                    <div>
                      <span>
                        NEW RATE
                      </span>

                      <strong>
                        {
                          analytics.newRate
                        }%
                      </strong>
                    </div>

                  </div>

                </div>

                {/* STATUS DISTRIBUTION */}

                <div className="admin-panel admin-status-panel">

                  <PanelHeader
                    eyebrow="MESSAGE STATUS"
                    title="Current distribution"
                    action={
                      <BarChart3
                        size={16}
                      />
                    }
                  />

                  <div className="admin-status-chart">

                    <StatusProgress
                      label="New"
                      value={
                        stats.new
                      }
                      total={
                        stats.total
                      }
                      className="new"
                    />

                    <StatusProgress
                      label="Read"
                      value={
                        stats.read
                      }
                      total={
                        stats.total
                      }
                      className="read"
                    />

                    <StatusProgress
                      label="Replied"
                      value={
                        stats.replied
                      }
                      total={
                        stats.total
                      }
                      className="replied"
                    />

                  </div>

                  <div className="admin-status-summary">

                    <div className="admin-status-summary-icon">
                      <CheckCircle2
                        size={18}
                      />
                    </div>

                    <div>
                      <span>
                        Response progress
                      </span>

                      <strong>
                        {
                          analytics.repliedRate
                        }%
                        <small>
                          {" "}
                          of inquiries replied
                        </small>
                      </strong>
                    </div>

                  </div>

                </div>

              </div>

              {/* RECENT */}

              <div className="admin-panel admin-recent-panel">

                <PanelHeader
                  eyebrow="LATEST INQUIRIES"
                  title="Recent messages"
                  action={
                    <button
                      className="admin-panel-link"
                      onClick={() =>
                        handleNavigation(
                          "messages"
                        )
                      }
                    >
                      View all

                      <ArrowUpRight
                        size={
                          15
                        }
                      />
                    </button>
                  }
                />

                {loading ? (
                  <LoadingState />
                ) : contacts.length ===
                  0 ? (
                  <EmptyState />
                ) : (
                  <div className="admin-recent-list">

                    {contacts
                      .slice(
                        0,
                        5
                      )
                      .map(
                        (
                          contact,
                          index
                        ) => (
                          <MessageRow
                            key={
                              contact._id
                            }
                            contact={
                              contact
                            }
                            index={
                              index
                            }
                            onClick={() =>
                              openMessage(
                                contact
                              )
                            }
                          />
                        )
                      )}

                  </div>
                )}

              </div>

            </motion.section>
          )}

          {/* =================================================
              MESSAGES
          ================================================= */}

          {activeSection ===
            "messages" && (
            <motion.section
              className="admin-section"
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >

              <div className="admin-page-heading">

                <div>

                  <span className="admin-section-kicker">
                    INBOX /
                    CONTACT
                  </span>

                  <h2>
                    Project inquiries.
                  </h2>

                  <p>
                    Manage every
                    conversation
                    submitted through
                    your portfolio.
                  </p>

                </div>

                <div className="admin-message-count">

                  <strong>
                    {
                      filteredContacts.length
                    }
                  </strong>

                  <span>
                    messages
                  </span>

                </div>

              </div>

              {/* FILTER BAR */}

              <div className="admin-toolbar">

                <div className="admin-search">

                  <Search
                    size={16}
                  />

                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={
                      searchTerm
                    }
                    onChange={(
                      event
                    ) =>
                      setSearchTerm(
                        event
                          .target
                          .value
                      )
                    }
                  />

                </div>

                <div className="admin-filter">

                  <select
                    value={
                      statusFilter
                    }
                    onChange={(
                      event
                    ) =>
                      setStatusFilter(
                        event
                          .target
                          .value
                      )
                    }
                  >

                    <option value="all">
                      All statuses
                    </option>

                    <option value="new">
                      New
                    </option>

                    <option value="read">
                      Read
                    </option>

                    <option value="replied">
                      Replied
                    </option>

                  </select>

                  <ChevronDown
                    size={15}
                  />

                </div>

                <button
                  className="admin-refresh"
                  onClick={() => {
                    fetchContacts();
                    fetchStats();
                  }}
                  disabled={
                    loading
                  }
                >
                  {loading
                    ? "Refreshing..."
                    : "Refresh"}
                </button>

              </div>

              {/* MESSAGE TABLE */}

              <div className="admin-panel admin-table-panel">

                {loading ? (
                  <LoadingState />
                ) : filteredContacts.length ===
                  0 ? (
                  <EmptyState />
                ) : (
                  <div className="admin-table-wrapper">

                    <table className="admin-table">

                      <thead>
                        <tr>

                          <th>
                            CONTACT
                          </th>

                          <th>
                            PROJECT
                          </th>

                          <th>
                            MESSAGE
                          </th>

                          <th>
                            DATE
                          </th>

                          <th>
                            STATUS
                          </th>

                          <th />

                        </tr>
                      </thead>

                      <tbody>

                        {filteredContacts.map(
                          (
                            contact
                          ) => (
                            <tr
                              key={
                                contact._id
                              }
                            >

                              <td>

                                <div className="admin-contact-cell">

                                  <div className="admin-contact-avatar">
                                    {contact.name
                                      ?.charAt(
                                        0
                                      )
                                      ?.toUpperCase()}
                                  </div>

                                  <div>

                                    <strong>
                                      {
                                        contact.name
                                      }
                                    </strong>

                                    <span>
                                      {
                                        contact.email
                                      }
                                    </span>

                                  </div>

                                </div>

                              </td>

                              <td>

                                <span className="admin-project-tag">
                                  {
                                    contact.projectType
                                  }
                                </span>

                              </td>

                              <td>

                                <p className="admin-message-preview">
                                  {
                                    contact.message
                                  }
                                </p>

                              </td>

                              <td>

                                <span className="admin-date">
                                  {formatDate(
                                    contact.createdAt
                                  )}
                                </span>

                              </td>

                              <td>

                                <StatusBadge
                                  status={
                                    contact.status
                                  }
                                />

                              </td>

                              <td>

                                <button
                                  className="admin-view-button"
                                  onClick={() =>
                                    openMessage(
                                      contact
                                    )
                                  }
                                  aria-label="View message"
                                >
                                  <ArrowUpRight
                                    size={
                                      15
                                    }
                                  />
                                </button>

                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>

            </motion.section>
          )}

        </div>

      </main>

      {/* MESSAGE DETAIL DRAWER */}

      <AnimatePresence>

        {selectedContact && (
          <>
            <motion.div
              className="admin-drawer-overlay"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setSelectedContact(
                  null
                )
              }
            />

            <motion.aside
              className="admin-message-drawer"
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >

              <div className="admin-drawer-header">

                <div>

                  <span className="admin-section-kicker">
                    MESSAGE
                    DETAILS
                  </span>

                  <h3>
                    Inquiry
                  </h3>

                </div>

                <button
                  className="admin-drawer-close"
                  onClick={() =>
                    setSelectedContact(
                      null
                    )
                  }
                  aria-label="Close message"
                >
                  <X
                    size={18}
                  />
                </button>

              </div>

              <div className="admin-drawer-content">

                <div className="admin-detail-person">

                  <div className="admin-detail-avatar">
                    {selectedContact.name
                      ?.charAt(
                        0
                      )
                      ?.toUpperCase()}
                  </div>

                  <div>

                    <h4>
                      {
                        selectedContact.name
                      }
                    </h4>

                    <a
                      href={`mailto:${selectedContact.email}`}
                    >
                      <Mail
                        size={14}
                      />

                      {
                        selectedContact.email
                      }
                    </a>

                  </div>

                </div>

                <div className="admin-detail-grid">

                  <DetailItem
                    label="PROJECT TYPE"
                    value={
                      selectedContact.projectType
                    }
                  />

                  <DetailItem
                    label="RECEIVED"
                    value={formatDate(
                      selectedContact.createdAt
                    )}
                  />

                </div>

                <div className="admin-detail-message">

                  <span>
                    MESSAGE
                  </span>

                  <p>
                    {
                      selectedContact.message
                    }
                  </p>

                </div>

                <div className="admin-status-control">

                  <span>
                    UPDATE STATUS
                  </span>

                  <div className="admin-status-options">

                    {Object.entries(
                      statusConfig
                    ).map(
                      ([
                        status,
                        config,
                      ]) => {
                        const Icon =
                          config.icon;

                        return (
                          <button
                            key={
                              status
                            }
                            disabled={
                              updatingStatus
                            }
                            className={`admin-status-option ${
                              selectedContact.status ===
                              status
                                ? `active ${config.className}`
                                : ""
                            }`}
                            onClick={() =>
                              updateStatus(
                                selectedContact._id,
                                status
                              )
                            }
                          >

                            <Icon
                              size={
                                14
                              }
                            />

                            {
                              config.label
                            }

                          </button>
                        );
                      }
                    )}

                  </div>

                </div>

                <div className="admin-drawer-actions">

                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="admin-reply-button"
                  >
                    <Mail
                      size={16}
                    />

                    Reply via email

                    <ArrowUpRight
                      size={
                        15
                      }
                    />
                  </a>

                </div>

              </div>

            </motion.aside>
          </>
        )}

      </AnimatePresence>

    </div>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  label,
  value,
  detail,
  icon: Icon,
  accent,
}) => {
  return (
    <motion.div
      className={`admin-stat-card admin-stat-${accent}`}
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
    >

      <div className="admin-stat-top">

        <span>
          {label}
        </span>

        <div className="admin-stat-icon">

          <Icon
            size={17}
          />

        </div>

      </div>

      <div className="admin-stat-value">
        {value}
      </div>

      <div className="admin-stat-bottom">

        <span>
          {detail}
        </span>

        <span className="admin-stat-line" />

      </div>

    </motion.div>
  );
};

/* =========================================================
   STATUS PROGRESS
========================================================= */

const StatusProgress = ({
  label,
  value,
  total,
  className,
}) => {
  const percentage =
    total > 0
      ? Math.round(
          (value /
            total) *
            100
        )
      : 0;

  return (
    <div className="admin-progress-item">

      <div className="admin-progress-top">

        <div>
          <span
            className={`admin-progress-dot ${className}`}
          />

          <span>
            {label}
          </span>
        </div>

        <strong>
          {value}
        </strong>

      </div>

      <div className="admin-progress-track">

        <motion.div
          className={`admin-progress-fill ${className}`}
          initial={{
            width: 0,
          }}
          animate={{
            width: `${percentage}%`,
          }}
          transition={{
            duration: 0.8,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        />

      </div>

      <span className="admin-progress-percent">
        {percentage}% of total
      </span>

    </div>
  );
};

/* =========================================================
   PANEL HEADER
========================================================= */

const PanelHeader = ({
  eyebrow,
  title,
  action,
}) => {
  return (
    <div className="admin-panel-header">

      <div>

        <span>
          {eyebrow}
        </span>

        <h3>
          {title}
        </h3>

      </div>

      {action}

    </div>
  );
};

/* =========================================================
   MESSAGE ROW
========================================================= */

const MessageRow = ({
  contact,
  index,
  onClick,
}) => {
  return (
    <motion.button
      className="admin-message-row"
      onClick={
        onClick
      }
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          index * 0.05,
      }}
    >

      <div className="admin-row-avatar">
        {contact.name
          ?.charAt(
            0
          )
          ?.toUpperCase()}
      </div>

      <div className="admin-row-main">

        <div className="admin-row-name">

          <strong>
            {
              contact.name
            }
          </strong>

          <span>
            {
              contact.email
            }
          </span>

        </div>

        <p>
          {
            contact.message
          }
        </p>

      </div>

      <div className="admin-row-meta">

        <StatusBadge
          status={
            contact.status
          }
        />

        <span>
          {formatDate(
            contact.createdAt
          )}
        </span>

      </div>

      <ArrowUpRight
        className="admin-row-arrow"
        size={17}
      />

    </motion.button>
  );
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}) => {
  const config =
    statusConfig[
      status
    ] ||
    statusConfig.new;

  const Icon =
    config.icon;

  return (
    <span
      className={`admin-status-badge ${config.className}`}
    >

      <Icon
        size={11}
      />

      {
        config.label
      }

    </span>
  );
};

/* =========================================================
   DETAIL ITEM
========================================================= */

const DetailItem = ({
  label,
  value,
}) => {
  return (
    <div className="admin-detail-item">

      <span>
        {label}
      </span>

      <strong>
        {value ||
          "—"}
      </strong>

    </div>
  );
};

/* =========================================================
   LOADING
========================================================= */

const LoadingState = () => {
  return (
    <div className="admin-loading">

      <div className="admin-loader" />

      <span>
        Loading messages...
      </span>

    </div>
  );
};

/* =========================================================
   EMPTY
========================================================= */

const EmptyState = () => {
  return (
    <div className="admin-empty">

      <div className="admin-empty-icon">

        <Inbox
          size={21}
        />

      </div>

      <h4>
        No messages found
      </h4>

      <p>
        Your contact inquiries
        will appear here.
      </p>

    </div>
  );
};

export default Admin;